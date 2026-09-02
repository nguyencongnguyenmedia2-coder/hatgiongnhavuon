import { BlogPost } from '@/types';
import { DEMO_BLOGS } from '@/lib/demoData';

const STORAGE_KEY = 'hnv_store_blogs';

export function getStoredBlogs(): BlogPost[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: BlogPost[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
  }
  return DEMO_BLOGS;
}

export function saveBlogToStore(blog: BlogPost): void {
  const current = getStoredBlogs();
  const existingIdx = current.findIndex((b) => b.id === blog.id || b.slug === blog.slug);

  let updated: BlogPost[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = blog;
  } else {
    updated = [blog, ...current];
  }

  const demoIdx = DEMO_BLOGS.findIndex((b) => b.id === blog.id || b.slug === blog.slug);
  if (demoIdx >= 0) {
    DEMO_BLOGS[demoIdx] = blog;
  } else {
    DEMO_BLOGS.unshift(blog);
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}

export function deleteBlogFromStore(blogId: string): void {
  const current = getStoredBlogs();
  const updated = current.filter((b) => b.id !== blogId && b.slug !== blogId);

  const demoIdx = DEMO_BLOGS.findIndex((b) => b.id === blogId || b.slug === blogId);
  if (demoIdx >= 0) {
    DEMO_BLOGS.splice(demoIdx, 1);
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}
