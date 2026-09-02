import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, phone, email, message } = await request.json();
    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Thiếu thông tin liên hệ.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Đã lưu lời nhắn liên hệ thành công.',
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Lỗi gửi liên hệ.' }, { status: 500 });
  }
}
