import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DYE Hub - Trợ lý soạn giáo án AI",
  description:
    "Nền tảng hỗ trợ giáo viên tạo kịch bản bài giảng Lego Spike, Python và Pygame bằng AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-muted/40">
        <Sidebar />
        <div className="flex min-h-full flex-col md:pl-[250px]">
          <Header />
          <main className="flex-1 px-4 py-6 md:px-8 md:py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
