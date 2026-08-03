import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { locales, type Locale } from '../i18n/request';
import ErrorHandler from '../error-handler';
import { fontVariables } from '../fonts';
import type { Metadata } from "next";

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
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        className={`${fontVariables} font-sans antialiased`}
        suppressHydrationWarning
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
      </body>
    </html>
  );
}
