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

const siteCopy = {
  en: {
    title: "Pedro Ferreira | Software Developer",
    description:
      "End-to-end software developer: from product discovery and UX to full-stack delivery, infrastructure, deploy, and ongoing maintenance — leveraging modern tooling and AI to ship faster with confidence.",
  },
  pt: {
    title: "Pedro Ferreira | Software Developer",
    description:
      "Software developer de ponta a ponta: do discovery e UX à entrega full-stack, infraestrutura, deploy e manutenção contínua — com ferramentas modernas e AI para acelerar com confiança.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (locales.includes(raw as Locale) ? raw : "en") as Locale;
  const copy = siteCopy[locale];
  const path = `/${locale}/`;

  return {
    metadataBase: new URL("https://pedrofdev.com"),
    title: copy.title,
    description: copy.description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: path,
      languages: {
        en: "/en/",
        pt: "/pt/",
        "x-default": "/en/",
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    openGraph: {
      type: "website",
      url: `https://pedrofdev.com${path}`,
      title: copy.title,
      description: copy.description,
      siteName: "Pedro Ferreira Portfolio",
      locale: locale === "pt" ? "pt_PT" : "en_US",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Pedro Ferreira - Software Developer Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: ["/og-image.jpg"],
    },
  };
}

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
