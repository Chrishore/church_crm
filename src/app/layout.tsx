import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore: Cannot find module or type declarations for side-effect import of './globals.css'.
import "./globals.css";


export const metadata: Metadata = {
  title: "ChurchCRM Dashboard",
  description: "Dashboard built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
