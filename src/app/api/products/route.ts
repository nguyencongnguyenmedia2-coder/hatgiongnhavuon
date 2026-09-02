import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import { Product } from '@/types';

// In-memory master server array to synchronize across requests if DB falls back
let SERVER_PRODUCTS_STORE: Product[] = [...DEMO_PRODUCTS];

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('*, product_images(*)');

    if (!error && dbProducts && dbProducts.length > 0) {
      // Map DB products to frontend Product interface
      const mappedProducts: Product[] = dbProducts.map((p: any) => ({
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
          : [],
        created_at: p.created_at,
      }));

      // Update server memory
      SERVER_PRODUCTS_STORE = mappedProducts;
      return NextResponse.json({ success: true, products: mappedProducts, source: 'supabase' });
    }
  } catch (err) {
    console.error('Supabase fetch error:', err);
  }

  return NextResponse.json({ success: true, products: SERVER_PRODUCTS_STORE, source: 'server_memory' });
}

export async function POST(request: Request) {
  try {
    const product: Product = await request.json();

    if (!product || !product.name || !product.sku) {
      return NextResponse.json({ success: false, error: 'Thiếu thông tin sản phẩm bắt buộc.' }, { status: 400 });
    }

    // 1. Update in-memory server store
    const existingIdx = SERVER_PRODUCTS_STORE.findIndex((p) => p.id === product.id || p.sku === product.sku);
    if (existingIdx >= 0) {
      SERVER_PRODUCTS_STORE[existingIdx] = product;
    } else {
      SERVER_PRODUCTS_STORE.unshift(product);
    }

    // 2. Sync to Supabase Database if configured
    try {
      const supabase = createAdminClient();
      const primaryImg = product.images && product.images.length > 0 ? product.images[0].image_url : '';

      // Prepare product payload for DB
      const dbPayload: any = {
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        short_description: product.short_description,
        description: product.description,
        price: product.price,
        compare_price: product.compare_price || null,
        stock: product.stock,
        germination_rate: product.germination_rate,
        planting_season: product.planting_season,
        difficulty: product.difficulty,
        package_quantity: product.package_quantity,
        origin: product.origin,
        best_seller: Boolean(product.best_seller),
        is_new: Boolean(product.is_new),
        is_active: Boolean(product.is_active),
      };

      // Check if product exists in Supabase
      const { data: existingDbProd } = await supabase
        .from('products')
        .select('id')
        .eq('sku', product.sku)
        .maybeSingle();

      let targetDbId = existingDbProd?.id;

      if (targetDbId) {
        await supabase.from('products').update(dbPayload).eq('id', targetDbId);
      } else {
        const { data: newDbProd } = await supabase
          .from('products')
          .insert(dbPayload)
          .select('id')
          .single();
        targetDbId = newDbProd?.id;
      }

      // Upsert product images
      if (targetDbId && primaryImg) {
        await supabase.from('product_images').delete().eq('product_id', targetDbId);
        await supabase.from('product_images').insert({
          product_id: targetDbId,
          image_url: primaryImg,
          is_primary: true,
        });
      }
    } catch (supabaseErr) {
      console.warn('Supabase sync warning (fallback to server memory):', supabaseErr);
    }

    return NextResponse.json({ success: true, product });
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
