import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = envContent.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : '';
const serviceRoleKey = keyMatch ? keyMatch[1].trim() : '';

const supabase = createClient(supabaseUrl, serviceRoleKey);

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
    name: "Combo Hạt Giống",
    slug: "combo",
    description: "Bộ sưu tập hạt giống tiết kiệm 20% - 35% cho người mới bắt đầu.",
    image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    sort_order: 4
  }
];

async function seedData() {
  console.log('Seeding categories via Admin Service Role...');
  const { data: catData, error: catError } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' }).select();
  if (catError) console.error('Admin Category Seed Error:', catError.message);
  else console.log('Admin Categories Seeded Successfully! Count:', catData.length);
}

seedData();
