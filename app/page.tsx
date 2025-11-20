'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLocale } from './i18n/request';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl">Loading...</p>
    </div>
  );
}
