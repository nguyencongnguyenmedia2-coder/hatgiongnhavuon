import { Product } from '@/types';
import { DEMO_PRODUCTS } from '@/lib/demoData';

const STORAGE_KEY = 'hnv_store_products';

// Auto-sync trigger flag to prevent infinite loops
let isSyncing = false;

// Initialize from localStorage if on client
if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: Product[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach((p) => {
          if (!DEMO_PRODUCTS.some((dp) => dp.id === p.id || dp.sku === p.sku)) {
            DEMO_PRODUCTS.unshift(p);
          }
        });
      }
    }
  } catch {
    // Ignore
  }

  // Trigger initial background sync with Supabase / Server Backend
  syncProductsWithServer();
}

/**
 * Fetch latest global products from Supabase / Server Backend API and update local cache
 */
export async function syncProductsWithServer(): Promise<Product[]> {
  if (typeof window === 'undefined' || isSyncing) return getStoredProducts();
  isSyncing = true;

  try {
    const res = await fetch('/api/products', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.products) && data.products.length > 0) {
        const serverProducts: Product[] = data.products;
        const currentLocal = getStoredProducts();

        // Merge local products that might not be on server yet
        const mergedMap = new Map<string, Product>();
        serverProducts.forEach((p) => mergedMap.set(p.id, p));
        currentLocal.forEach((p) => {
          if (!mergedMap.has(p.id)) {
            mergedMap.set(p.id, p);
          }
        });

        const mergedList = Array.from(mergedMap.values());

        // Save merged list to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedList));

        // Sync in-memory DEMO_PRODUCTS
        mergedList.forEach((p) => {
          const idx = DEMO_PRODUCTS.findIndex((dp) => dp.id === p.id || dp.sku === p.sku);
          if (idx >= 0) {
            DEMO_PRODUCTS[idx] = p;
          } else {
            DEMO_PRODUCTS.unshift(p);
          }
        });

        isSyncing = false;
        return mergedList;
      }
    }
  } catch (err) {
    console.warn('Server sync error:', err);
  }

  isSyncing = false;
  return getStoredProducts();
}

export function getStoredProducts(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Product[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore
    }
  }
  return DEMO_PRODUCTS;
}

export function saveProductToStore(product: Product): void {
  // 1. Instant local memory sync
  const existingIdx = DEMO_PRODUCTS.findIndex((p) => p.id === product.id || p.sku === product.sku);
  if (existingIdx >= 0) {
    DEMO_PRODUCTS[existingIdx] = product;
  } else {
    DEMO_PRODUCTS.unshift(product);
  }

  const current = getStoredProducts();
  const idx = current.findIndex((p) => p.id === product.id || p.sku === product.sku);
  let updated: Product[];
  if (idx >= 0) {
    updated = [...current];
    updated[idx] = product;
  } else {
    updated = [product, ...current];
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('hnv_products_updated'));
    } catch {
      // Ignore
    }

    // 2. Async background push to Supabase / Server Backend API
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then(() => {
        window.dispatchEvent(new Event('hnv_products_updated'));
      })
      .catch((err) => console.warn('Supabase push error:', err));
  }
}

export function deleteProductFromStore(productId: string): void {
  // 1. Instant local memory delete
  const demoIdx = DEMO_PRODUCTS.findIndex((p) => p.id === productId || p.sku === productId);
  if (demoIdx >= 0) {
    DEMO_PRODUCTS.splice(demoIdx, 1);
  }

  const current = getStoredProducts();
  const updated = current.filter((p) => p.id !== productId && p.sku !== productId);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('hnv_products_updated'));
    } catch {
      // Ignore
    }

    // 2. Async background delete on Supabase / Server Backend API
    fetch(`/api/products?id=${encodeURIComponent(productId)}`, {
      method: 'DELETE',
    })
      .then(() => {
        window.dispatchEvent(new Event('hnv_products_updated'));
      })
      .catch((err) => console.warn('Supabase delete error:', err));
  }
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getStoredProducts();
  return products.find((p) => p.slug === slug || p.id === slug);
}
