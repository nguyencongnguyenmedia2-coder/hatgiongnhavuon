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

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Hạt Giống Hoa Cúc Mix",
    slug: "hat-giong-hoa-cuc-mix",
    sku: "HNV-HOA-01",
    short_description: "Cúc đa màu rực rỡ, thích hợp trang trí ban công, sân vườn. Tỷ lệ nảy mầm >90%.",
    description: "Hạt giống hoa Cúc Mix (Nhiều màu) chọn lọc kỹ lưỡng. Hoa nở to, mọc khỏe, chịu nhiệt tốt, thời gian ra hoa kéo dài 2-3 tháng. Cây cao từ 30-40cm, phù hợp trồng chậu hoặc bồn hoa.",
    price: 35000,
    compare_price: 45000,
    cost_price: 15000,
    stock: 120,
    category_id: "cat-1",
    category_name: "Hạt Giống Hoa",
    seed_type: "Hoa Cúc",
    germination_rate: "≥ 90%",
    germination_days_min: 3,
    germination_days_max: 5,
    planting_season: "Quanh năm",
    difficulty: "Dễ trồng",
    package_quantity: "0.5g (~100 hạt)",
    origin: "Thái Lan",
    featured: true,
    best_seller: true,
    is_new: true,
    is_active: true,
    images: [
      { id: "img-1", product_id: "prod-1", image_url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80", alt_text: "Hoa Cúc Mix", sort_order: 0, is_primary: true },
      { id: "img-2", product_id: "prod-1", image_url: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80", alt_text: "Vườn hoa cúc nở rực rỡ", sort_order: 1, is_primary: false }
    ]
  },
  {
    id: "prod-2",
    name: "Hạt Giống Hoa Hồng Pháp Mix",
    slug: "hat-giong-hoa-hong-phap-mix",
    sku: "HNV-HOA-02",
    short_description: "Hoa hồng nhiều màu ngát hương, cây khỏe, hoa to lâu tàn.",
    description: "Hạt giống Hoa Hồng Pháp Mix cao cấp, tỷ lệ nảy mầm cao sau khi ngâm ủ đúng kỹ thuật. Cây dạng bụi, nhiều nhánh, cho hoa quanh năm.",
    price: 45000,
    compare_price: 60000,
    cost_price: 20000,
    stock: 85,
    category_id: "cat-1",
    category_name: "Hạt Giống Hoa",
    seed_type: "Hoa Hồng",
    germination_rate: "≥ 85%",
    germination_days_min: 7,
    germination_days_max: 14,
    planting_season: "Thu - Xuân",
    difficulty: "Trung bình",
    package_quantity: "20 hạt",
    origin: "Pháp / Nhật Bản",
    featured: true,
    best_seller: true,
    is_new: false,
    is_active: true,
    images: [
      { id: "img-3", product_id: "prod-2", image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", alt_text: "Hoa Hồng Pháp", sort_order: 0, is_primary: true }
    ]
  },
  {
    id: "prod-3",
    name: "Hạt Giống Hoa Mười Giờ Thái Nổi",
    slug: "hat-giong-hoa-muoi-gio-thai",
    sku: "HNV-HOA-03",
    short_description: "Siêu dễ trồng, bông to kép nhiều màu, nở rực dưới ánh nắng.",
    description: "Hoa Mười Giờ Thái kép hạt giống khỏe, chỉ sau 45-50 ngày gieo đã bắt đầu nảy nụ hoa rực rỡ. Rất thích hợp trang trí lối đi, chậu treo.",
    price: 25000,
    compare_price: 35000,
    cost_price: 10000,
    stock: 200,
    category_id: "cat-1",
    category_name: "Hạt Giống Hoa",
    seed_type: "Mười Giờ",
    germination_rate: "≥ 92%",
    germination_days_min: 2,
    germination_days_max: 4,
    planting_season: "Quanh năm",
    difficulty: "Cực dễ",
    package_quantity: "100 hạt",
    origin: "Thái Lan",
    featured: true,
    best_seller: true,
    is_new: true,
    is_active: true,
    images: [
      { id: "img-4", product_id: "prod-3", image_url: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=800&q=80", alt_text: "Hoa Mười Giờ Thái", sort_order: 0, is_primary: true }
    ]
  },
  {
    id: "prod-4",
    name: "Hạt Giống Hoa Hướng Dương Lùn",
    slug: "hat-giong-hoa-huong-duong-lun",
    sku: "HNV-HOA-04",
    short_description: "Hướng dương lùn trồng chậu, bông to vàng óng, cây cao 40cm.",
    description: "Hướng dương lùn thích hợp trồng ban công, để bàn làm việc. Hoa nở tươi lâu 2-3 tuần, mang ý nghĩa năng lượng và may mắn.",
    price: 30000,
    compare_price: 40000,
    cost_price: 12000,
    stock: 90,
    category_id: "cat-1",
    category_name: "Hạt Giống Hoa",
    seed_type: "Hướng Dương",
    germination_rate: "≥ 88%",
    germination_days_min: 3,
    germination_days_max: 6,
    planting_season: "Quanh năm",
    difficulty: "Dễ trồng",
    package_quantity: "30 hạt",
    origin: "Việt Nam",
    featured: true,
    best_seller: false,
    is_new: true,
    is_active: true,
    images: [
      { id: "img-5", product_id: "prod-4", image_url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80", alt_text: "Hoa Hướng Dương Lùn", sort_order: 0, is_primary: true }
    ]
  },
  {
    id: "prod-5",
    name: "Hạt Giống Rau Cải Ngọt F1",
    slug: "hat-giong-rau-cai-ngot",
    sku: "HNV-RAU-01",
    short_description: "Rau cải ngọt thu hoạch sau 25-30 ngày, lá xanh non ngọt mát.",
    description: "Hạt giống rau cải ngọt F1 thuần thục nhanh, lá to dày, ăn ngọt giòn. Kháng bệnh vượt trội, trồng khay xốp hoặc đất vườn.",
    price: 20000,
    compare_price: 28000,
    cost_price: 8000,
    stock: 150,
    category_id: "cat-2",
    category_name: "Hạt Giống Rau",
    seed_type: "Rau Cải",
    germination_rate: "≥ 95%",
    germination_days_min: 1,
    germination_days_max: 3,
    planting_season: "Quanh năm",
    difficulty: "Cực dễ",
    package_quantity: "20g (~500 hạt)",
    origin: "Trang Nông",
    featured: true,
    best_seller: true,
    is_new: false,
    is_active: true,
    images: [
      { id: "img-6", product_id: "prod-5", image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80", alt_text: "Rau Cải Ngọt F1", sort_order: 0, is_primary: true }
    ]
  },
  {
    id: "prod-6",
    name: "Hạt Giống Rau Muống Lá Tre",
    slug: "hat-giong-rau-muong-la-tre",
    sku: "HNV-RAU-02",
    short_description: "Rau muống cao sản, sinh trưởng siêu nhanh 20-25 ngày cắt lứa.",
    description: "Rau muống lá tre thân nhỏ ngọn giòn, gieo 1 lần thu hoạch nhiều lứa. Rất dễ sống ở mọi điều kiện thổ nhưỡng.",
    price: 18000,
    compare_price: 25000,
    cost_price: 7000,
    stock: 300,
    category_id: "cat-2",
    category_name: "Hạt Giống Rau",
    seed_type: "Rau Muống",
    germination_rate: "≥ 95%",
    germination_days_min: 2,
    germination_days_max: 4,
    planting_season: "Quanh năm",
    difficulty: "Cực dễ",
    package_quantity: "50g",
    origin: "Việt Nam",
    featured: false,
    best_seller: true,
    is_new: false,
    is_active: true,
    images: [
      { id: "img-7", product_id: "prod-6", image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80", alt_text: "Rau Muống Lá Tre", sort_order: 0, is_primary: true }
    ]
  },
  {
    id: "prod-7",
    name: "Hạt Giống Cà Chua Bi Biểu Tượng Cherry",
    slug: "hat-giong-ca-chua-bi-cherry",
    sku: "HNV-RAU-03",
    short_description: "Cà chua bi trái sai trĩu cành, vị ngọt thanh, giòn mọng.",
    description: "Cà chua bi Cherry đỏ mọng cho năng suất từ 3-5kg trái/cây. Có thể trồng chậu leo giàn ban công vừa lấy trái ăn vừa làm cảnh.",
    price: 32000,
    compare_price: 42000,
    cost_price: 13000,
    stock: 75,
    category_id: "cat-2",
    category_name: "Hạt Giống Rau",
    seed_type: "Cà Chua Bi",
    germination_rate: "≥ 88%",
    germination_days_min: 4,
    germination_days_max: 7,
    planting_season: "Quanh năm",
    difficulty: "Dễ trồng",
    package_quantity: "30 hạt",
    origin: "Mỹ",
    featured: true,
    best_seller: true,
    is_new: true,
    is_active: true,
    images: [
      { id: "img-8", product_id: "prod-7", image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80", alt_text: "Cà Chua Bi Cherry", sort_order: 0, is_primary: true }
    ]
  },
  {
    id: "prod-8",
    name: "Combo 5 Loại Hạt Giống Hoa Dễ Trồng Cho Người Mới",
    slug: "combo-5-loai-hat-giong-hoa",
    sku: "HNV-COMBO-01",
    short_description: "Bao gồm: Cúc Mix + Hướng Dương Lùn + Mười Giờ + Cẩm Chướng + Vạn Thọ.",
    description: "Bộ Combo tiết kiệm 30% chi phí. Dành riêng cho các bạn đam mê làm vườn muốn có ngay một ban công ngập tràn sắc hoa rực rỡ.",
    price: 119000,
    compare_price: 165000,
    cost_price: 50000,
    stock: 45,
    category_id: "cat-5",
    category_name: "Combo Hạt Giống",
    seed_type: "Combo Hoa",
    germination_rate: "≥ 90%",
    germination_days_min: 2,
    germination_days_max: 6,
    planting_season: "Quanh năm",
    difficulty: "Dễ trồng",
    package_quantity: "5 Gói Hạt Giống",
    origin: "Nhập khẩu chọn lọc",
    featured: true,
    best_seller: true,
    is_new: true,
    is_active: true,
    images: [
      { id: "img-9", product_id: "prod-8", image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80", alt_text: "Combo 5 Loại Hạt Giống Hoa", sort_order: 0, is_primary: true }
    ]
  }
];

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
