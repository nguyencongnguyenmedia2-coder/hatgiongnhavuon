import { NextResponse } from 'next/server';
import { DEMO_PRODUCTS, DEFAULT_SITE_SETTINGS } from '@/lib/demoData';
import { calculateOrderTotals } from '@/lib/pricing';
import { sendOrderNotification } from '@/lib/telegram';
import { Order, OrderItem } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customer_name,
      customer_phone,
      customer_email,
      province,
      district,
      ward,
      address,
      note,
      payment_method,
      items,
    } = body;

    if (!customer_name || !customer_phone || !address || !province || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Thiếu thông tin nhận hàng hoặc danh sách sản phẩm.' },
        { status: 400 }
      );
    }

    // Map demo / database products
    const productsMap = new Map();
    DEMO_PRODUCTS.forEach((p) => productsMap.set(p.id, p));

    // Calculate totals strictly on server
    const totals = calculateOrderTotals({
      items,
      productsMap,
      settings: DEFAULT_SITE_SETTINGS,
    });

    // Generate Order Code HNV-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const orderCode = `HNV-${dateStr}-${randomSeq}`;

    // Create Order Items snapshot
    const orderItems: OrderItem[] = totals.items.map((i) => ({
      product_id: i.product.id,
      product_name_snapshot: i.product.name,
      sku_snapshot: i.product.sku,
      price_snapshot: i.unit_price,
      quantity: i.quantity,
      subtotal: i.subtotal,
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      order_code: orderCode,
      customer_name,
      customer_phone,
      customer_email,
      province,
      district,
      ward,
      address,
      note,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping_fee: totals.shipping_fee,
      total: totals.total,
      payment_method: payment_method || 'COD',
      payment_status: 'unpaid',
      order_status: 'pending',
      items: orderItems,
      created_at: new Date().toISOString(),
    };

    // Trigger Automated Telegram Notification (Requirement 33)
    let telegramResult = { success: false };
    try {
      telegramResult = await sendOrderNotification(newOrder);
      if (telegramResult.success) {
        newOrder.telegram_sent = true;
        newOrder.telegram_sent_at = new Date().toISOString();
      }
    } catch {
      // Order must STILL be created if Telegram fails (Requirement 34)
      newOrder.telegram_sent = false;
    }

    return NextResponse.json({
      success: true,
      order: newOrder,
      telegram: telegramResult,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Lỗi xử lý đơn hàng.';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
