export function getMessengerConfirmationUrl(orderCode: string, pageUrl?: string): string {
  const baseUrl = pageUrl || process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || 'https://facebook.com/hatgiongnhavuon';
  
  // Extract page ID or standard m.me link if available
  if (baseUrl.includes('m.me')) {
    return `${baseUrl}?ref=${encodeURIComponent(orderCode)}`;
  }

  // Convert standard page URL to m.me referral
  const cleanUrl = baseUrl.replace(/\/$/, '');
  const pageName = cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1);
  return `https://m.me/${pageName}?ref=${encodeURIComponent(orderCode)}`;
}

export interface MessengerWebhookPayload {
  object: string;
  entry: Array<{
    id: string;
    time: number;
    messaging: Array<{
      sender: { id: string };
      recipient: { id: string };
      timestamp: number;
      message?: {
        mid: string;
        text: string;
      };
      referral?: {
        ref: string;
        source: string;
        type: string;
      };
    }>;
  }>;
}

export async function sendMessengerMessage(
  recipientId: string,
  text: string
): Promise<{ success: boolean; error?: string }> {
  const pageAccessToken = process.env.META_PAGE_ACCESS_TOKEN;

  if (!pageAccessToken) {
    return {
      success: false,
      error: 'Meta Page Access Token chưa được cấu hình.',
    };
  }

  try {
    const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text: text },
      }),
    });

    const data = await response.json();
    if (data.error) {
      return { success: false, error: data.error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Lỗi kết nối Meta Graph API';
    return { success: false, error: errorMessage };
  }
}
