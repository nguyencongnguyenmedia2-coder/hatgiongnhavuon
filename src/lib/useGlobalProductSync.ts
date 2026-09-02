'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { getStoredProducts, syncProductsWithServer } from '@/lib/productStore';
import { createClient } from '@/lib/supabase/client';

/**
 * Custom React Hook for Instant Supabase Realtime & Global Product Synchronization
 * Keeps all storefront pages updated in real-time when any product is added, edited, or deleted anywhere in the world!
 */
export function useGlobalProductSync(initialCategorySlug?: string): Product[] {
  const [products, setProducts] = useState<Product[]>(() => filterProducts(getStoredProducts(), initialCategorySlug));

  function filterProducts(allProds: Product[], catSlug?: string): Product[] {
    const active = allProds.filter((p) => p.is_active);
    if (!catSlug) return active;

    if (catSlug === 'hat-giong-hoa') {
      return active.filter((p) => p.category_id === 'cat-1' || p.category_name?.includes('Hoa') || p.slug.includes('hoa'));
    }
    if (catSlug === 'hat-giong-rau') {
      return active.filter((p) => p.category_id === 'cat-2' || p.category_name?.includes('Rau') || p.slug.includes('rau'));
    }
    if (catSlug === 'hat-giong-cay-an-trai') {
      return active.filter((p) => p.category_id === 'cat-3' || p.category_name?.includes('Trái') || p.slug.includes('trai'));
    }
    if (catSlug === 'combo') {
      return active.filter((p) => p.category_id === 'cat-5' || p.category_name?.includes('Combo') || p.slug.includes('combo'));
    }
    return active;
  }

  const refreshProducts = async () => {
    const synced = await syncProductsWithServer();
    setProducts(filterProducts(synced, initialCategorySlug));
  };

  useEffect(() => {
    // 1. Initial Server Sync on Mount
    refreshProducts();

    // 2. Local Tab Event Listener
    const handleLocalUpdate = () => {
      setProducts(filterProducts(getStoredProducts(), initialCategorySlug));
    };
    window.addEventListener('hnv_products_updated', handleLocalUpdate);

    // 3. Supabase Realtime Channel Subscription for Instant Cross-Device Sync
    let channel: any;
    try {
      const supabase = createClient();
      channel = supabase
        .channel('public:products')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'products' },
          () => {
            refreshProducts();
          }
        )
        .subscribe();
    } catch (err) {
      console.warn('Realtime subscription fallback:', err);
    }

    // 4. Backup Polling Interval (every 6 seconds) for 100% Instant Guarantee
    const intervalId = setInterval(() => {
      refreshProducts();
    }, 6000);

    return () => {
      window.removeEventListener('hnv_products_updated', handleLocalUpdate);
      if (channel) {
        try {
          const supabase = createClient();
          supabase.removeChannel(channel);
        } catch {
          // Ignore
        }
      }
      clearInterval(intervalId);
    };
  }, [initialCategorySlug]);

  return products;
}
