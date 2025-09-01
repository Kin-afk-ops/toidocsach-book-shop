import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tôi Đọc Sách - Mua sách trực tuyến",
  description:
    "Tôi Đọc Sách là nền tảng mua bán và chia sẻ sách trực tuyến. Khám phá kho tàng tri thức, đặt mua sách yêu thích và quản lý giỏ hàng dễ dàng.",
  keywords: [
    "Tôi Đọc Sách",
    "sách trực tuyến",
    "mua sách online",
    "cửa hàng sách",
    "book shop",
  ],
  authors: [{ name: "Tôi Đọc Sách Team" }],
  openGraph: {
    title: "Tôi Đọc Sách - Nền tảng mua sách trực tuyến",
    description:
      "Khám phá và mua sách dễ dàng trên Tôi Đọc Sách. Hơn cả một hiệu sách online.",
    url: "https://toidocsach.com", // sau này thay bằng domain thật
    siteName: "Tôi Đọc Sách",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] `}
      >
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
