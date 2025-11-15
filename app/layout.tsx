import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";

// Replace Geist with Inter (does NOT fail during build)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AALIS",
  description: "Next-Generation Acoustic Autonomous Lightweight Intelligent System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
