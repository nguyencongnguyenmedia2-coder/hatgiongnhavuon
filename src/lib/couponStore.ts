import { Coupon } from '@/types';

const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'VUONHOA10',
    discount_type: 'percentage',
    discount_value: 10,
    min_order_amount: 100000,
    times_used: 24,
    usage_limit: 1000,
    is_active: true,
  },
  {
    id: 'coup-2',
    code: 'GIAM20K',
    discount_type: 'fixed_amount',
    discount_value: 20000,
    min_order_amount: 150000,
    times_used: 15,
    usage_limit: 500,
    is_active: true,
  },
  {
    id: 'coup-3',
    code: 'FREESHIP300',
    discount_type: 'fixed_amount',
    discount_value: 30000,
    min_order_amount: 300000,
    times_used: 8,
    usage_limit: 200,
    is_active: true,
  },
];

const STORAGE_KEY = 'hnv_store_coupons';

export function getStoredCoupons(): Coupon[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Coupon[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
  }
  return INITIAL_COUPONS;
}

export function saveCouponToStore(coupon: Coupon): void {
  const current = getStoredCoupons();
  const existingIdx = current.findIndex((c) => c.id === coupon.id || c.code.toUpperCase() === coupon.code.toUpperCase());

  let updated: Coupon[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = coupon;
  } else {
    updated = [coupon, ...current];
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}

export function deleteCouponFromStore(couponId: string): void {
  const current = getStoredCoupons();
  const updated = current.filter((c) => c.id !== couponId && c.code !== couponId);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}
