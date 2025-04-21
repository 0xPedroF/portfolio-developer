import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { locales } from '../i18n/request';
import { ThemeProvider } from '../provider';
import ErrorHandler from '../error-handler';
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();
  
  let messages;
  try {
    messages = (await import(`../../messages/${locale}/index.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ErrorHandler>
              {children}
            </ErrorHandler>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 