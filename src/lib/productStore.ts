import { Product } from '@/types';
import { DEMO_PRODUCTS } from '@/lib/demoData';

const STORAGE_KEY = 'hnv_store_products';

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
    } catch {
      // Ignore
    }
  }
}

export function deleteProductFromStore(productId: string): void {
  const demoIdx = DEMO_PRODUCTS.findIndex((p) => p.id === productId || p.sku === productId);
  if (demoIdx >= 0) {
    DEMO_PRODUCTS.splice(demoIdx, 1);
  }

  const current = getStoredProducts();
  const updated = current.filter((p) => p.id !== productId && p.sku !== productId);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getStoredProducts();
  return products.find((p) => p.slug === slug || p.id === slug);
}
