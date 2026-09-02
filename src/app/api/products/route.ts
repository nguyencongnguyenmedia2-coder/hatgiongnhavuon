import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import { Product } from '@/types';

// Persistent in-memory master server store
let SERVER_PRODUCTS_STORE: Product[] = [...DEMO_PRODUCTS];

// Helper to merge local server store with Supabase DB products
function mergeProducts(dbProducts: Product[], serverProducts: Product[]): Product[] {
  const mergedMap = new Map<string, Product>();

  // Add DB products first
  dbProducts.forEach((p) => {
    mergedMap.set(p.id, p);
    mergedMap.set(p.sku, p);
  });

  // Add/overwrite with server products
  serverProducts.forEach((p) => {
    mergedMap.set(p.id, p);
  });

  return Array.from(new Set(mergedMap.values()));
}

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('*, product_images(*)');

    if (!error && dbProducts) {
      if (dbProducts.length === 0) {
        // Auto-seed initial demo products into Supabase Database
        try {
          for (const p of DEMO_PRODUCTS) {
            const primaryImg = p.images && p.images.length > 0 ? p.images[0].image_url : '';
            const { data: newDbProd } = await supabase
              .from('products')
              .insert({
                name: p.name,
                slug: p.slug,
                sku: p.sku,
                short_description: p.short_description || '',
                description: p.description || '',
                price: p.price,
                compare_price: p.compare_price || null,
                stock: p.stock,
                germination_rate: p.germination_rate || '≥ 90%',
                planting_season: p.planting_season || 'Quanh năm',
                difficulty: p.difficulty || 'Dễ trồng',
                package_quantity: p.package_quantity || 'Gói chuẩn',
                origin: p.origin || 'Việt Nam',
                best_seller: Boolean(p.best_seller),
                is_new: Boolean(p.is_new),
                is_active: Boolean(p.is_active),
              })
              .select('id')
              .single();

            if (newDbProd?.id && primaryImg) {
              await supabase.from('product_images').insert({
                product_id: newDbProd.id,
                image_url: primaryImg,
                is_primary: true,
              });
            }
          }
        } catch (seedErr) {
          console.warn('Auto-seed Supabase warning:', seedErr);
        }
      } else {
        const mappedProducts: Product[] = dbProducts.map((p: any) => {
          const primaryImageObj = p.product_images && p.product_images.length > 0 ? p.product_images[0] : null;
          return {
            id: p.id,
            name: p.name,
            slug: p.slug,
            sku: p.sku,
            short_description: p.short_description || '',
            description: p.description || '',
            price: Number(p.price) || 0,
            compare_price: p.compare_price ? Number(p.compare_price) : undefined,
            stock: Number(p.stock) || 0,
            category_id: p.category_id,
            seed_type: p.seed_type,
            germination_rate: p.germination_rate,
            germination_days_min: p.germination_days_min,
            germination_days_max: p.germination_days_max,
            planting_season: p.planting_season,
            difficulty: p.difficulty,
            package_quantity: p.package_quantity,
            origin: p.origin,
            featured: p.featured,
            best_seller: p.best_seller,
            is_new: p.is_new,
            is_active: p.is_active,
            images: p.product_images && p.product_images.length > 0
              ? p.product_images.map((img: any) => ({
                  id: img.id,
                  product_id: img.product_id,
                  image_url: img.image_url,
                  is_primary: img.is_primary,
                  sort_order: img.sort_order || 0,
                }))
              : primaryImageObj ? [{ id: 'img-1', product_id: p.id, image_url: primaryImageObj.image_url, is_primary: true, sort_order: 1 }] : [],
            created_at: p.created_at,
          };
        });

        // MERGE: Keep both Supabase products AND newly added server products
        SERVER_PRODUCTS_STORE = mergeProducts(mappedProducts, SERVER_PRODUCTS_STORE);
      }
    }
  } catch (err) {
    console.warn('Supabase fetch warning:', err);
  }

  return NextResponse.json({ success: true, products: SERVER_PRODUCTS_STORE });
}

export async function POST(request: Request) {
  try {
    const product: Product = await request.json();

    if (!product || !product.name || !product.sku) {
      return NextResponse.json({ success: false, error: 'Thiếu thông tin sản phẩm bắt buộc.' }, { status: 400 });
    }

    // 1. ALWAYS Save/Upsert in-memory server store immediately (so product is NEVER lost!)
    const existingIdx = SERVER_PRODUCTS_STORE.findIndex((p) => p.id === product.id || p.sku === product.sku);
    if (existingIdx >= 0) {
      SERVER_PRODUCTS_STORE[existingIdx] = product;
    } else {
      SERVER_PRODUCTS_STORE.unshift(product);
    }

    // 2. Sync to Supabase DB
    let supabaseResult = { synced: false, error: '' };
    try {
      const supabase = createAdminClient();
      const primaryImg = product.images && product.images.length > 0 ? product.images[0].image_url : '';

      const dbPayload: any = {
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        short_description: product.short_description || '',
        description: product.description || '',
        price: product.price,
        compare_price: product.compare_price || null,
        stock: product.stock,
        germination_rate: product.germination_rate || '≥ 90%',
        planting_season: product.planting_season || 'Quanh năm',
        difficulty: product.difficulty || 'Dễ trồng',
        package_quantity: product.package_quantity || 'Gói chuẩn',
        origin: product.origin || 'Việt Nam',
        best_seller: Boolean(product.best_seller),
        is_new: Boolean(product.is_new),
        is_active: Boolean(product.is_active),
      };

      // Check existing in DB by SKU or Slug
      const { data: existingDbProd } = await supabase
        .from('products')
        .select('id')
        .or(`sku.eq.${product.sku},slug.eq.${product.slug}`)
        .maybeSingle();

      let targetDbId = existingDbProd?.id;

      if (targetDbId) {
        const { error: updateErr } = await supabase.from('products').update(dbPayload).eq('id', targetDbId);
        if (updateErr) supabaseResult.error = updateErr.message;
        else supabaseResult.synced = true;
      } else {
        const { data: newDbProd, error: insertErr } = await supabase
          .from('products')
          .insert(dbPayload)
          .select('id')
          .single();

        if (insertErr) {
          supabaseResult.error = insertErr.message;
        } else {
          targetDbId = newDbProd?.id;
          supabaseResult.synced = true;
        }
      }

      // Upsert Image if DB ID exists
      if (targetDbId && primaryImg) {
        await supabase.from('product_images').delete().eq('product_id', targetDbId);
        await supabase.from('product_images').insert({
          product_id: targetDbId,
          image_url: primaryImg,
          is_primary: true,
        });
      }
    } catch (supabaseErr: any) {
      supabaseResult.error = supabaseErr?.message || 'Supabase write error';
    }

    return NextResponse.json({ success: true, product, supabase: supabaseResult });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Thiếu ID sản phẩm cần xóa.' }, { status: 400 });
    }

    // 1. Remove from server memory
    SERVER_PRODUCTS_STORE = SERVER_PRODUCTS_STORE.filter((p) => p.id !== id && p.sku !== id);

    // 2. Remove from Supabase DB
    try {
      const supabase = createAdminClient();
      await supabase.from('products').delete().or(`id.eq.${id},sku.eq.${id}`);
    } catch {
      // Ignore fallback
    }

    return NextResponse.json({ success: true, deleted_id: id });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
