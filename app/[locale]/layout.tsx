import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { locales, type Locale } from '../i18n/request';
import { ThemeProvider } from '../provider';
import ErrorHandler from '../error-handler';
import localFont from "next/font/local";
import { Outfit } from "next/font/google";
import type { Metadata } from "next";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://pedrofdev.com"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://pedrofdev.com",
    title: "Pedro F. | Software Developer Portfolio",
    description: "A skilled software developer with expertise in React, Next.js, Java and TypeScript.",
    siteName: "Pedro Ferreira Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pedro Ferreira - Software Developer Portfolio",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro F. | Software Developer Portfolio",
    description: "A skilled software developer with expertise in React, Next.js, Java and TypeScript.",
    images: ["/og-image.jpg"],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}/index.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="Europe/Lisbon"
          >
            <ErrorHandler>
              {children}
            </ErrorHandler>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
