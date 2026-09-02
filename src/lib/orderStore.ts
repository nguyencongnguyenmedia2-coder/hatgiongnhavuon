import { Order } from '@/types';

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-1',
    order_code: 'HNV-20260902-0001',
    customer_name: 'Nguyễn Văn A',
    customer_phone: '0901234567',
    customer_email: 'nguyenvana@gmail.com',
    province: 'Quảng Ngãi',
    district: 'Tư Nghĩa',
    ward: 'Nghĩa Điền',
    address: '123 Đường Vườn Hoa',
    subtotal: 115000,
    discount: 0,
    shipping_fee: 0,
    total: 115000,
    payment_method: 'COD',
    payment_status: 'unpaid',
    order_status: 'pending',
    telegram_sent: true,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    items: [
      {
        product_id: 'prod-1',
        product_name_snapshot: 'Hạt Giống Hoa Cúc Mix',
        sku_snapshot: 'HNV-HOA-01',
        price_snapshot: 35000,
        quantity: 2,
        subtotal: 70000,
      },
      {
        product_id: 'prod-2',
        product_name_snapshot: 'Hạt Giống Hoa Hồng Pháp Mix',
        sku_snapshot: 'HNV-HOA-02',
        price_snapshot: 45000,
        quantity: 1,
        subtotal: 45000,
      },
    ],
  },
  {
    id: 'ord-2',
    order_code: 'HNV-20260902-0002',
    customer_name: 'Trần Thị B',
    customer_phone: '0934811307',
    customer_email: 'tranthib@gmail.com',
    province: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Bến Nghé',
    address: '456 Nguyễn Thị Minh Khai',
    subtotal: 350000,
    discount: 0,
    shipping_fee: 0,
    total: 350000,
    payment_method: 'BANK_TRANSFER',
    payment_status: 'paid',
    order_status: 'confirmed',
    telegram_sent: true,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    items: [
      {
        product_id: 'prod-5',
        product_name_snapshot: 'Hạt Giống Rau Cải Ngọt F1',
        sku_snapshot: 'HNV-RAU-01',
        price_snapshot: 20000,
        quantity: 5,
        subtotal: 100000,
      },
    ],
  },
];

const STORAGE_KEY = 'hnv_store_orders';

// In-memory fallback
let memoryOrders: Order[] = [...INITIAL_DEMO_ORDERS];

export function getStoredOrders(): Order[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
  }
  return memoryOrders;
}

export function saveOrderToStore(newOrder: Order): void {
  const currentOrders = getStoredOrders();
  const updated = [newOrder, ...currentOrders];
  memoryOrders = updated;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore write errors
    }
  }
}

export function updateOrderStatusInStore(orderCodeOrId: string, status: Order['order_status']): void {
  const currentOrders = getStoredOrders();
  const updated = currentOrders.map((o) => {
    if (o.id === orderCodeOrId || o.order_code === orderCodeOrId) {
      return { ...o, order_status: status };
    }
    return o;
  });
  memoryOrders = updated;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}
