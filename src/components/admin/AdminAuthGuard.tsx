'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isSessionValid } from '@/lib/authStore';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // If on login page, pass through
    if (pathname === '/admin/dang-nhap') {
      setAuthorized(true);
      setChecking(false);
      return;
    }

    const valid = isSessionValid();
    if (!valid) {
      setAuthorized(false);
      setChecking(false);
      router.push('/admin/dang-nhap');
    } else {
      setAuthorized(true);
      setChecking(false);
    }
  }, [pathname, router]);

  if (pathname === '/admin/dang-nhap') {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black text-emerald-100">Đang kiểm tra quyền đăng nhập Admin...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
