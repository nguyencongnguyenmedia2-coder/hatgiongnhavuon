import React from 'react';
import Header from '@/components/storefront/Header';
import MobileHeader from '@/components/storefront/MobileHeader';
import MobileBottomNav from '@/components/storefront/MobileBottomNav';
import FloatingButtons from '@/components/storefront/FloatingButtons';
import Footer from '@/components/storefront/Footer';
import CartDrawer from '@/components/storefront/CartDrawer';
import { DEFAULT_SITE_SETTINGS } from '@/lib/demoData';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white selection:bg-emerald-200 selection:text-emerald-950">
      <div>
        <Header settings={DEFAULT_SITE_SETTINGS} />
        <MobileHeader />
        <main>{children}</main>
      </div>

      <CartDrawer />
      <FloatingButtons
        hotline={DEFAULT_SITE_SETTINGS.hotline}
        messengerUrl={DEFAULT_SITE_SETTINGS.messenger_url}
      />
      <MobileBottomNav messengerUrl={DEFAULT_SITE_SETTINGS.messenger_url} />
      <Footer settings={DEFAULT_SITE_SETTINGS} />
    </div>
  );
}
