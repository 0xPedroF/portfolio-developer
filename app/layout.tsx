// Root layout required by Next.js.
// Locale routes own <html>/<body> in app/[locale]/layout.tsx (next-intl static export).
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
