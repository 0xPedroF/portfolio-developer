// Root layout - required by Next.js
// For static export with next-intl, the locale layout handles the actual HTML structure
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // For static export with locale routing, children from [locale]/layout already includes html/body
  // This root layout is required by Next.js but may not render in final output
  return children;
}