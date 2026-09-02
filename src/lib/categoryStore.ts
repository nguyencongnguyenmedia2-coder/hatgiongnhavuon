import { Category } from '@/types';
import { DEMO_CATEGORIES } from '@/lib/demoData';

const STORAGE_KEY = 'hnv_store_categories';

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
      // Fallback
    }
  }
  return DEMO_CATEGORIES;
}

export function saveCategoryToStore(category: Category): void {
  const current = getStoredCategories();
  const existingIdx = current.findIndex((c) => c.id === category.id || c.slug === category.slug);

  let updated: Category[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = category;
  } else {
    updated = [...current, category];
  }

  // Sync DEMO_CATEGORIES array
  const demoIdx = DEMO_CATEGORIES.findIndex((c) => c.id === category.id || c.slug === category.slug);
  if (demoIdx >= 0) {
    DEMO_CATEGORIES[demoIdx] = category;
  } else {
    DEMO_CATEGORIES.push(category);
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}

export function deleteCategoryFromStore(categoryId: string): void {
  const current = getStoredCategories();
  const updated = current.filter((c) => c.id !== categoryId);

  const demoIdx = DEMO_CATEGORIES.findIndex((c) => c.id === categoryId);
  if (demoIdx >= 0) {
    DEMO_CATEGORIES.splice(demoIdx, 1);
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}
