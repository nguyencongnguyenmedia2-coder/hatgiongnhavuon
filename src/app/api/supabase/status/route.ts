import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  const result: any = {
    connected: false,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'Chưa cấu hình',
    tables: {
      products: false,
      product_images: false,
      categories: false,
      orders: false,
    },
    message: '',
  };

  try {
    const supabase = createAdminClient();

    // 1. Test products table
    const { data: prodData, error: prodErr } = await supabase.from('products').select('id').limit(1);
    if (!prodErr) {
      result.tables.products = true;
      result.connected = true;
    } else {
      result.message += ` [Products error: ${prodErr.message}]`;
    }

    // 2. Test product_images table
    const { error: imgErr } = await supabase.from('product_images').select('id').limit(1);
    if (!imgErr) result.tables.product_images = true;

    // 3. Test categories table
    const { error: catErr } = await supabase.from('categories').select('id').limit(1);
    if (!catErr) result.tables.categories = true;

    // 4. Test orders table
    const { error: ordErr } = await supabase.from('orders').select('id').limit(1);
    if (!ordErr) result.tables.orders = true;

    if (result.connected) {
      result.message = '✅ Kết nối Supabase PostgreSQL Cloud thành công!';
    } else {
      result.message = '⚠️ Chưa chạy SQL Schema trên Supabase Dashboard hoặc bị RLS Policy chặn.';
    }

    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      connected: false,
      error: err.message,
      message: '❌ Lỗi kết nối Supabase API.',
    });
  }
}
