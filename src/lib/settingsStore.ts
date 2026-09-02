import { SiteSettings } from '@/types';
import { DEFAULT_SITE_SETTINGS } from '@/lib/demoData';

const STORAGE_KEY = 'hnv_store_settings';

export function getStoredSettings(): SiteSettings {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: SiteSettings = JSON.parse(stored);
        return { ...DEFAULT_SITE_SETTINGS, ...parsed };
      }
    } catch {
      // Fallback
    }
  }
  return DEFAULT_SITE_SETTINGS;
}

export function saveSettingsToStore(newSettings: Partial<SiteSettings>): SiteSettings {
  const current = getStoredSettings();
  const updated = { ...current, ...newSettings };

  // Sync DEFAULT_SITE_SETTINGS
  Object.assign(DEFAULT_SITE_SETTINGS, updated);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
  return updated;
}
