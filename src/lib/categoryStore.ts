import { Category } from '@/types';
import { DEMO_CATEGORIES } from '@/lib/demoData';

const STORAGE_KEY = 'hnv_store_categories';

// Auto init on client
if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: Category[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach((c) => {
          if (!DEMO_CATEGORIES.some((dc) => dc.id === c.id || dc.slug === c.slug)) {
            DEMO_CATEGORIES.push(c);
          }
        });
      }
    }
  } catch {
    // Ignore
  }

  // Trigger background sync with Supabase / Server API
  syncCategoriesWithServer();
}

export async function syncCategoriesWithServer(): Promise<Category[]> {
  if (typeof window === 'undefined') return getStoredCategories();
  try {
    const res = await fetch('/api/categories', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.categories));
        return data.categories;
      }
    }
  } catch (err) {
    console.warn('Category sync error:', err);
  }
  return getStoredCategories();
}

export function getStoredCategories(): Category[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Category[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore
    }
  }
  return DEMO_CATEGORIES;
}

export function saveCategoryToStore(category: Category): void {
  const existingIdx = DEMO_CATEGORIES.findIndex((c) => c.id === category.id || c.slug === category.slug);
  if (existingIdx >= 0) {
    DEMO_CATEGORIES[existingIdx] = category;
  } else {
    DEMO_CATEGORIES.push(category);
  }

  const current = getStoredCategories();
  const idx = current.findIndex((c) => c.id === category.id || c.slug === category.slug);
  let updated: Category[];
  if (idx >= 0) {
    updated = [...current];
    updated[idx] = category;
  } else {
    updated = [...current, category];
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    // Background push to Supabase / Server API
    fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    }).catch((err) => console.warn('Category Supabase push error:', err));
  }
}

export function deleteCategoryFromStore(categoryId: string): void {
  const demoIdx = DEMO_CATEGORIES.findIndex((c) => c.id === categoryId);
  if (demoIdx >= 0) {
    DEMO_CATEGORIES.splice(demoIdx, 1);
  }

  const current = getStoredCategories();
  const updated = current.filter((c) => c.id !== categoryId);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}
