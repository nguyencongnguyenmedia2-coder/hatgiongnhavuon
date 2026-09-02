export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: string;
  sort_order?: number;
  is_active: boolean;
  created_at?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  short_description?: string;
  description?: string;
  price: number;
  compare_price?: number;
  cost_price?: number;
  stock: number;
  reserved_stock?: number;
  low_stock_threshold?: number;
  category_id?: string;
  category_name?: string;
  seed_type?: string;
  germination_rate?: string;
  germination_days_min?: number;
  germination_days_max?: number;
  planting_season?: string;
  difficulty?: string;
  package_quantity?: string;
  origin?: string;
  featured?: boolean;
  best_seller?: boolean;
  is_new?: boolean;
  is_active: boolean;
  meta_title?: string;
  meta_description?: string;
  images?: ProductImage[];
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'COD' | 'BANK_TRANSFER';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';
export type OrderStatus = 'pending' | 'confirmed' | 'packing' | 'shipping' | 'completed' | 'cancelled';

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id?: string;
  product_name_snapshot: string;
  sku_snapshot?: string;
  price_snapshot: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  order_code: string;
  customer_id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  province: string;
  district?: string;
  ward?: string;
  address: string;
  note?: string;
  subtotal: number;
  discount: number;
  shipping_fee: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  messenger_reference?: string;
  telegram_sent?: boolean;
  telegram_sent_at?: string;
  items?: OrderItem[];
  created_at?: string;
  updated_at?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  province?: string;
  district?: string;
  ward?: string;
  address?: string;
  total_orders: number;
  total_spent: number;
  last_order_at?: string;
  created_at?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed_amount';
  discount_value: number;
  min_order_amount?: number;
  max_discount_amount?: number;
  start_date?: string;
  end_date?: string;
  usage_limit?: number;
  times_used?: number;
  limit_per_customer?: number;
  is_active: boolean;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  customer_phone?: string;
  rating: number;
  comment: string;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  category_id?: string;
  author?: string;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  published: boolean;
  published_at?: string;
  created_at?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image_url: string;
  mobile_image_url?: string;
  button_text?: string;
  button_url?: string;
  sort_order?: number;
  is_active: boolean;
}

export interface SiteSettings {
  store_name: string;
  slogan: string;
  hotline: string;
  email: string;
  address: string;
  facebook_page: string;
  messenger_url: string;
  telegram_bot_token?: string;
  telegram_chat_id?: string;
  shipping_fee: number;
  free_shipping_threshold: number;
  bank_name: string;
  bank_account_no: string;
  bank_account_holder: string;
  bank_qr_template: string;
}
