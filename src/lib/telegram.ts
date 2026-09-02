import { Order } from '@/types';

export interface TelegramConfig {
  botToken?: string;
  chatId?: string;
}

export function formatTelegramOrderMessage(order: Order): string {
  const formattedDate = order.created_at
    ? new Date(order.created_at).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
    : new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  const itemsList = (order.items || [])
    .map(
      (item) =>
        `🌸 *${item.product_name_snapshot}* × ${item.quantity}\n   ${item.price_snapshot.toLocaleString('vi-VN')}đ × ${item.quantity} = *${item.subtotal.toLocaleString('vi-VN')}đ*`
    )
    .join('\n\n');

  return `🌱 *ĐƠN HÀNG MỚI - HẠT GIỐNG NHÀ VƯỜN*

━━━━━━━━━━━━━━━━━━━━

🧾 *Mã đơn:*
\`${order.order_code}\`

👤 *Khách hàng:*
${order.customer_name}

📱 *Số điện thoại:*
[${order.customer_phone}](tel:${order.customer_phone})

📍 *Địa chỉ giao hàng:*
${order.address}, ${order.ward ? order.ward + ', ' : ''}${order.district ? order.district + ', ' : ''}${order.province}

${order.note ? `📝 *Ghi chú:* ${order.note}\n` : ''}━━━━━━━━━━━━━━━━━━━━

🛒 *DANH SÁCH SẢN PHẨM*

${itemsList}

━━━━━━━━━━━━━━━━━━━━

💵 *Tạm tính:* ${order.subtotal.toLocaleString('vi-VN')}đ
🏷️ *Giảm giá:* -${order.discount.toLocaleString('vi-VN')}đ
🚚 *Phí vận chuyển:* ${order.shipping_fee === 0 ? 'Miễn phí' : `${order.shipping_fee.toLocaleString('vi-VN')}đ`}
💰 *TỔNG CỘNG:* *${order.total.toLocaleString('vi-VN')}đ*

💳 *Thanh toán:* ${order.payment_method === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}

━━━━━━━━━━━━━━━━━━━━

⏰ *Thời gian đặt hàng:* ${formattedDate}`;
}

export async function sendOrderNotification(
  order: Order,
  customConfig?: TelegramConfig
): Promise<{ success: boolean; messageId?: number; error?: string }> {
  const botToken = customConfig?.botToken || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = customConfig?.chatId || process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return {
      success: false,
      error: 'Telegram Bot Token hoặc Chat ID chưa được cấu hình.',
    };
  }

  try {
    const text = formatTelegramOrderMessage(order);
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '💬 Tư vấn Messenger',
                url: `https://m.me/hatgiongnhavuon?ref=${order.order_code}`,
              },
            ],
          ],
        },
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      return {
        success: false,
        error: data.description || 'Lỗi gửi tin nhắn Telegram',
      };
    }

    return {
      success: true,
      messageId: data.result?.message_id,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Lỗi kết nối API Telegram';
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function testTelegramConnection(
  botToken: string,
  chatId: string
): Promise<{ success: boolean; error?: string }> {
  if (!botToken || !chatId) {
    return { success: false, error: 'Vui lòng điền đủ Bot Token và Chat ID.' };
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: '🟢 *HẠT GIỐNG NHÀ VƯỜN*: Kết nối Telegram Bot thành công! Hệ thống sẵn sàng nhận thông báo đơn hàng.',
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();
    if (data.ok) {
      return { success: true };
    } else {
      return { success: false, error: data.description || 'Gửi thử tin nhắn thất bại.' };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lỗi mạng khi kết nối Telegram API.';
    return { success: false, error: message };
  }
}
