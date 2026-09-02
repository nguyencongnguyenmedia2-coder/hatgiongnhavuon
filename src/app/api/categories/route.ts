import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { DEMO_CATEGORIES } from '@/lib/demoData';
import { Category } from '@/types';

let SERVER_CATEGORIES: Category[] = [...DEMO_CATEGORIES];

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: dbCategories, error } = await supabase.from('categories').select('*');

    if (!error && dbCategories && dbCategories.length > 0) {
      SERVER_CATEGORIES = dbCategories.map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || '',
        image_url: c.image_url || '',
        parent_id: c.parent_id,
        sort_order: c.sort_order || 0,
        is_active: c.is_active,
      }));
      return NextResponse.json({ success: true, categories: SERVER_CATEGORIES });
    }
  } catch (err) {
    console.error('Category Supabase fetch error:', err);
  }

  return NextResponse.json({ success: true, categories: SERVER_CATEGORIES });
}

export async function POST(request: Request) {
  try {
    const category: Category = await request.json();
    if (!category || !category.name) {
      return NextResponse.json({ success: false, error: 'Thiếu tên danh mục.' }, { status: 400 });
    }

    const idx = SERVER_CATEGORIES.findIndex((c) => c.id === category.id || c.slug === category.slug);
    if (idx >= 0) {
      SERVER_CATEGORIES[idx] = category;
    } else {
      SERVER_CATEGORIES.unshift(category);
    }

    try {
      const supabase = createAdminClient();
      await supabase.from('categories').upsert({
        id: category.id.startsWith('cat-') ? undefined : category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        image_url: category.image_url,
        is_active: category.is_active,
      });
    } catch (dbErr) {
      console.warn('Category Supabase sync warning:', dbErr);
    }

    return NextResponse.json({ success: true, category });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
