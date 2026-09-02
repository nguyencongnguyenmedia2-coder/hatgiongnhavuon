import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : '';
const supabaseAnonKey = keyMatch ? keyMatch[1].trim() : '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const categories = [
  {
    name: "Hạt Giống Hoa",
    slug: "hat-giong-hoa",
    description: "Các loại hạt giống hoa đẹp, dễ trồng, tỷ lệ nảy mầm cao cho vườn nhà rực rỡ.",
    image_url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    sort_order: 1
  },
  {
    name: "Hạt Giống Rau",
    slug: "hat-giong-rau",
    description: "Rau sạch tại nhà, nhanh thu hoạch, đảm bảo an toàn cho gia đình.",
    image_url: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19655?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    sort_order: 2
  },
  {
    name: "Hạt Giống Cây Ăn Trái",
    slug: "hat-giong-cay-an-trai",
    description: "Cây ăn quả lùn, trồng chậu, năng suất cao và ngọt mọng.",
    image_url: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    sort_order: 3
  },
  {
    name: "Hạt Giống Cây Cảnh",
    slug: "hat-giong-cay-canh",
    description: "Cây phong thủy, cây để bàn, cây bonsai dễ nuôi dưỡng.",
    image_url: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    sort_order: 4
  },
  {
    name: "Combo Hạt Giống",
    slug: "combo",
    description: "Bộ sưu tập hạt giống tiết kiệm 20% - 35% cho người mới bắt đầu.",
    image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    sort_order: 5
  }
];

const products = [
  {
    name: "Hạt Giống Hoa Cúc Mix",
    slug: "hat-giong-hoa-cuc-mix",
    sku: "HNV-HOA-01",
    short_description: "Cúc đa màu rực rỡ, thích hợp trang trí ban công, sân vườn. Tỷ lệ nảy mầm >90%.",
    description: "Hạt giống hoa Cúc Mix (Nhiều màu) chọn lọc kỹ lưỡng. Hoa nở to, mọc khỏe, chịu nhiệt tốt, thời gian ra hoa kéo dài 2-3 tháng. Cây cao từ 30-40cm, phù hợp trồng chậu hoặc bồn hoa.",
    price: 35000,
    compare_price: 45000,
    cost_price: 15000,
    stock: 120,
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
    is_active: true
  },
  {
    name: "Hạt Giống Hoa Hồng Pháp Mix",
    slug: "hat-giong-hoa-hong-phap-mix",
    sku: "HNV-HOA-02",
    short_description: "Hoa hồng nhiều màu ngát hương, cây khỏe, hoa to lâu tàn.",
    description: "Hạt giống Hoa Hồng Pháp Mix cao cấp, tỷ lệ nảy mầm cao sau khi ngâm ủ đúng kỹ thuật. Cây dạng bụi, nhiều nhánh, cho hoa quanh năm.",
    price: 45000,
    compare_price: 60000,
    cost_price: 20000,
    stock: 85,
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
    is_active: true
  },
  {
    name: "Hạt Giống Rau Cải Ngọt F1",
    slug: "hat-giong-rau-cai-ngot",
    sku: "HNV-RAU-01",
    short_description: "Rau cải ngọt thu hoạch sau 25-30 ngày, lá xanh non ngọt mát.",
    description: "Hạt giống rau cải ngọt F1 thuần thục nhanh, lá to dày, ăn ngọt giòn. Kháng bệnh vượt trội, trồng khay xốp hoặc đất vườn.",
    price: 20000,
    compare_price: 28000,
    cost_price: 8000,
    stock: 150,
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
    is_active: true
  }
];

async function seedData() {
  console.log('Seeding categories...');
  const { data: catData, error: catError } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' }).select();
  if (catError) console.error('Category Seed Error:', catError.message);
  else console.log('Categories Seeded:', catData.length);

  const flowerCat = catData ? catData.find(c => c.slug === 'hat-giong-hoa') : null;
  const vegCat = catData ? catData.find(c => c.slug === 'hat-giong-rau') : null;

  const productsWithCat = products.map(p => {
    if (p.sku.includes('HOA')) return { ...p, category_id: flowerCat?.id };
    if (p.sku.includes('RAU')) return { ...p, category_id: vegCat?.id };
    return p;
  });

  console.log('Seeding products...');
  const { data: prodData, error: prodError } = await supabase.from('products').upsert(productsWithCat, { onConflict: 'slug' }).select();
  if (prodError) console.error('Product Seed Error:', prodError.message);
  else console.log('Products Seeded:', prodData.length);
}

seedData();
