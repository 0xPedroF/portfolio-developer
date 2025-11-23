"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale } from "./i18n/request";

/**
 * Root not-found page - redirects to locale-specific 404
 * This handles cases where the route doesn't match any locale pattern
 */
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to default locale's 404 page
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-xl text-white/70">Redirecting...</p>
      </div>
    </div>
  );
}
