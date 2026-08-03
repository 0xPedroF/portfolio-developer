import localFont from "next/font/local";
import { Outfit } from "next/font/google";

export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/** CSS variables for Geist + Outfit — same stack as the homepage. */
export const fontVariables = `${geistSans.variable} ${geistMono.variable} ${outfit.variable}`;
