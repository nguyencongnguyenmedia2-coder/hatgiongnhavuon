import { NextResponse } from 'next/server';
import { testTelegramConnection } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const { botToken, chatId } = await request.json();

    if (!botToken || !chatId) {
      return NextResponse.json(
        { success: false, error: 'Thiếu Bot Token hoặc Chat ID' },
        { status: 400 }
      );
    }

    const result = await testTelegramConnection(botToken, chatId);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Lỗi kiểm tra Telegram API.';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
