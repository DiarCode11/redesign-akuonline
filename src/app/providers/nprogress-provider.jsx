'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Optional: konfigurasi
NProgress.configure({ showSpinner: false });

export default function NProgressProvider() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    // Sedikit delay untuk memastikan efek muncul
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null; // tidak perlu render apa pun
}
