import { Category, Product, Banner, BlogPost, SiteSettings } from '@/types';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  store_name: "Hạt Giống Nhà Vườn",
  slogan: "ƯƠM MẦM HÔM NAY – RỰC RỠ NGÀY MAI",
  hotline: "0934 811 307",
  email: "hotro@hatgiongnhavuon.vn",
  address: "123 Đường Vườn Hoa, Quảng Ngãi",
  facebook_page: "https://www.facebook.com/julymedia1.2/",
  messenger_url: "https://www.facebook.com/julymedia1.2/",
  telegram_bot_token: "8363856015:AAHaTRy7xtv7CM-EbuJZI6IZxWlhGZLYe80",
  telegram_chat_id: "8093505246",
  shipping_fee: 30000,
  free_shipping_threshold: 300000,
  bank_name: "MB Bank",
  bank_account_no: "7986 8686 86",
  bank_account_holder: "NGUYEN CONG NGUYEN",
  bank_qr_template: "https://img.vietqr.io/image/MB-7986868686-compact.png"
};

export const DEMO_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Hạt Giống Hoa",
    slug: "hat-giong-hoa",
    description: "Các loại hạt giống hoa đẹp, dễ trồng, tỷ lệ nảy mầm cao cho vườn nhà rực rỡ.",
    image_url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    sort_order: 1
  },
  {
    id: "cat-2",
    name: "Hạt Giống Rau",
    slug: "hat-giong-rau",
    description: "Rau sạch tại nhà, nhanh thu hoạch, đảm bảo an toàn cho gia đình.",
    image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    sort_order: 2
  },
  {
    id: "cat-3",
    name: "Hạt Giống Cây Ăn Trái",
    slug: "hat-giong-cay-an-trai",
    description: "Cây ăn quả lùn, trồng chậu, năng suất cao và ngọt mọng.",
    image_url: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    sort_order: 3
  },
  {
    id: "cat-5",
    name: "Combo Hạt Giống",
    slug: "combo",
    description: "Bộ sưu tập hạt giống tiết kiệm 20% - 35% cho người mới bắt đầu.",
    image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    sort_order: 5
  },
  {
    id: "cat-6",
    name: "Khuyến Mãi",
    slug: "khuyen-mai",
    description: "Hạt giống giá ưu đãi cực hot cập nhật hàng tuần.",
    image_url: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    sort_order: 6
  }
];

export const DEMO_PRODUCTS: Product[] = [];

export const DEMO_BANNERS: Banner[] = [
  {
    id: "ban-1",
    title: "HẠT GIỐNG NHÀ VƯỜN",
    subtitle: "ƯƠM MẦM HÔM NAY – RỰC RỠ NGÀY MAI",
    image_url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80",
    button_text: "KHÁM PHÁ HẠT GIỐNG",
    button_url: "/san-pham",
    is_active: true,
    sort_order: 1
  }
];

export const DEMO_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Kỹ Thuật Ngâm Ủ Hạt Giống Đạt Tỷ Lệ Nảy Mầm 99%",
    slug: "ky-thuat-ngam-u-hat-giong-dat-ty-le-nay-mam-high",
    excerpt: "Bật mí bí quyết ngâm hạt giống với nước ấm theo tỷ lệ 2 sôi 3 lạnh đơn giản mà hiệu quả cao.",
    content: `
      <h2>1. Tại sao cần ngâm ủ hạt giống trước khi gieo?</h2>
      <p>Ngâm ủ hạt giống giúp kích hoạt mầm cây bên trong vỏ hạt, làm mềm vỏ bọc ngoài và loại bỏ mầm bệnh tiềm ẩn.</p>
      <h2>2. Công thức nước 2 sôi 3 lạnh huyền thoại</h2>
      <p>Pha 2 phần nước sôi với 3 phần nước lạnh (khoảng 45 - 50 độ C). Ngâm hạt trong thời gian từ 3 - 6 tiếng tùy vỏ hạt dày hay mỏng.</p>
      <h2>3. Tiến hành ủ hạt</h2>
      <p>Sau khi ngâm, vớt hạt ra để ráo rồi bọc vào khăn ẩm sạch (khăn xô hoặc bông gòn). Đặt khăn ở nơi ấm áp, tránh ánh nắng trực tiếp.</p>
    `,
    featured_image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80",
    author: "Nhà Vườn Master",
    published: true,
    published_at: "2026-09-01T10:00:00Z"
  },
  {
    id: "blog-2",
    title: "Hướng Dẫn Trồng Và Chăm Sóc Vườn Rau Sạch Tại Ban Công",
    slug: "huong-dan-trong-rau-sach-ban-cong",
    excerpt: "Cách quy hoạch khay trồng, phối đất dinh dưỡng và làm lịch tưới cây cực nhàn cho người bận rộn.",
    content: `
      <h2>1. Chọn vị trí đón nắng cho ban công</h2>
      <p>Rau cần ít nhất 4 - 6 tiếng nắng mỗi ngày để lá xanh mướt và quang hợp tốt.</p>
      <h2>2. Trộn đất trồng giàu dinh dưỡng</h2>
      <p>Tỷ lệ phối trộn chuẩn: 50% đất thịt + 30% xơ dừa/trấu hun + 20% phân trùn quai hoặc phân mút hữu cơ.</p>
    `,
    featured_image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    author: "KTS Vườn Xanh",
    published: true,
    published_at: "2026-09-02T08:00:00Z"
  }
];
