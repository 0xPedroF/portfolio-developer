import NotFoundScreen, { defaultNotFoundCopy } from "@/components/NotFoundScreen";
import { defaultLocale } from "./i18n/request";
import { fontVariables } from "./fonts";
import "./globals.css";

/**
 * Global 404 for static export (`out/404.html`) and unmatched routes.
 * Own html/body because root layout returns children only (next-intl).
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`dark ${fontVariables}`} suppressHydrationWarning>
      <body
        className="min-h-screen bg-background font-sans text-foreground antialiased"
        suppressHydrationWarning
      >
        <NotFoundScreen
          homeHref={`/${defaultLocale}/`}
          copy={defaultNotFoundCopy}
        />
      </body>
    </html>
  );
}
