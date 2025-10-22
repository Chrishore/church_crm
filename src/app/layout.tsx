import type { Metadata } from "next";
// @ts-ignore: Cannot find module or type declarations for side-effect import of './globals.css'.
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";


export const metadata: Metadata = {
  title: "ChurchCRM Dashboard",
  description: "Dashboard built with Next.js and Tailwind CSS",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
