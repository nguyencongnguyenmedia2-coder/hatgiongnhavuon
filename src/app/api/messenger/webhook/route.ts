import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.META_VERIFY_TOKEN || 'hatgiongnhavuon_secret_2026';

  if (mode === 'subscribe' && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Verification failed', { status: 403 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.object === 'page') {
      body.entry?.forEach((entry: any) => {
        entry.messaging?.forEach((event: any) => {
          if (event.message?.text) {
            console.log('Received Messenger message:', event.message.text);
          }
        });
      });
      return NextResponse.json({ status: 'EVENT_RECEIVED' }, { status: 200 });
    }

    return NextResponse.json({ status: 'NOT_A_PAGE_EVENT' }, { status: 404 });
  } catch (err: unknown) {
    return NextResponse.json({ status: 'ERROR' }, { status: 500 });
  }
}
