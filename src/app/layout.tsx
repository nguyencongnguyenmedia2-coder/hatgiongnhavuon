import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://hatgiongnhavuon.vercel.app';
const BRAND_NAME = 'Hạt Giống Nhà Vườn';
const DEFAULT_TITLE = 'Hạt Giống Nhà Vườn | Hạt Giống Hoa, Rau Sạch, Cây Ăn Trái F1 Chuẩn Thuần';
const DEFAULT_DESCRIPTION = 'Chuyên cung cấp hạt giống hoa rực rỡ, hạt giống rau sạch F1, cây ăn trái chậu lùn chất lượng cao. Tỷ lệ nảy mầm >90%, giao hàng toàn quốc, kiểm tra trước khi thanh toán.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${BRAND_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'hạt giống nhà vườn',
    'hạt giống hoa',
    'hạt giống rau sạch',
    'hạt giống f1',
    'cây ăn trái chậu lùn',
    'hạt giống hoa cúc',
    'hạt giống hoa hồng',
    'hạt giống hoa hướng dương',
    'hạt giống dâu tây',
    'hạt giống ớt dại',
    'mua hạt giống online',
    'kỹ thuật gieo trồng hạt giống',
  ],
  authors: [{ name: BRAND_NAME, url: SITE_URL }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: BRAND_NAME,
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Logo Hạt Giống Nhà Vườn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/san-pham?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84-934-811-307',
      contactType: 'customer service',
      areaServed: 'VN',
      availableLanguage: ['Vietnamese'],
    },
    sameAs: ['https://www.facebook.com/julymedia1.2/'],
  };

  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
