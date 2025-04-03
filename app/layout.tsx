import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pedro Fernandes | Developer Portfolio",
  description: "A skilled software developer with expertise in React, Next.js, and TypeScript.",
  keywords: [
    "Pedro Fernandes",
    "Software Developer",
    "Developer",
    "web development",
    "next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Frontend",
    "Full-stack",
  ],
  icons: [
    {
      rel: "icon",
      url: "/icon.svg",
      type: "image/svg+xml",
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}