import { Product, Coupon, SiteSettings } from '@/types';

export interface CalculationInput {
  items: Array<{ product_id: string; quantity: number }>;
  productsMap: Map<string, Product>;
  coupon?: Coupon | null;
  settings: SiteSettings;
}

export interface CalculationResult {
  items: Array<{
    product: Product;
    quantity: number;
    unit_price: number;
    subtotal: number;
  }>;
  subtotal: number;
  discount: number;
  shipping_fee: number;
  total: number;
}

export function calculateOrderTotals(input: CalculationInput): CalculationResult {
  const { items, productsMap, coupon, settings } = input;

  let subtotal = 0;
  const processedItems = items.map((item) => {
    const product = productsMap.get(item.product_id);
    if (!product || !product.is_active) {
      throw new Error(`Sản phẩm không hợp lệ hoặc đã ngừng kinh doanh: ID ${item.product_id}`);
    }

    if (item.quantity <= 0) {
      throw new Error(`Số lượng sản phẩm ${product.name} không hợp lệ.`);
    }

    if (product.stock < item.quantity) {
      throw new Error(`Sản phẩm "${product.name}" không đủ tồn kho (Còn lại: ${product.stock}).`);
    }

    const unit_price = Number(product.price);
    const itemSubtotal = unit_price * item.quantity;
    subtotal += itemSubtotal;

    return {
      product,
      quantity: item.quantity,
      unit_price,
      subtotal: itemSubtotal,
    };
  });

  // Calculate discount from coupon
  let discount = 0;
  if (coupon && coupon.is_active) {
    const minOrder = Number(coupon.min_order_amount || 0);
    if (subtotal >= minOrder) {
      if (coupon.discount_type === 'percentage') {
        discount = Math.round((subtotal * Number(coupon.discount_value)) / 100);
        if (coupon.max_discount_amount && discount > Number(coupon.max_discount_amount)) {
          discount = Number(coupon.max_discount_amount);
        }
      } else if (coupon.discount_type === 'fixed_amount') {
        discount = Number(coupon.discount_value);
      }
    }
  }

  // Ensure discount does not exceed subtotal
  if (discount > subtotal) {
    discount = subtotal;
  }

  // Calculate shipping fee
  const threshold = Number(settings.free_shipping_threshold || 300000);
  const baseShipping = Number(settings.shipping_fee || 30000);
  
  // Free shipping threshold check (after discount or before discount - standard in VN is before discount or based on subtotal)
  const shipping_fee = subtotal >= threshold ? 0 : baseShipping;

  const total = subtotal - discount + shipping_fee;

  return {
    items: processedItems,
    subtotal,
    discount,
    shipping_fee,
    total: Math.max(0, total),
  };
}
