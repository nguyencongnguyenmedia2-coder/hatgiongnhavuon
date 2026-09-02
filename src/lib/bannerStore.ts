import { Banner } from '@/types';
import { DEMO_BANNERS } from '@/lib/demoData';

const STORAGE_KEY = 'hnv_store_banners';

export function getStoredBanners(): Banner[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Banner[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
  }
  return DEMO_BANNERS;
}

export function saveBannerToStore(banner: Banner): void {
  const current = getStoredBanners();
  const existingIdx = current.findIndex((b) => b.id === banner.id);

  let updated: Banner[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = banner;
  } else {
    updated = [banner, ...current];
  }

  const demoIdx = DEMO_BANNERS.findIndex((b) => b.id === banner.id);
  if (demoIdx >= 0) {
    DEMO_BANNERS[demoIdx] = banner;
  } else {
    DEMO_BANNERS.unshift(banner);
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}

export function deleteBannerFromStore(bannerId: string): void {
  const current = getStoredBanners();
  const updated = current.filter((b) => b.id !== bannerId);

  const demoIdx = DEMO_BANNERS.findIndex((b) => b.id === bannerId);
  if (demoIdx >= 0) {
    DEMO_BANNERS.splice(demoIdx, 1);
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}
