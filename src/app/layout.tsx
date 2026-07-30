import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="animate-float-slow absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="animate-float-slower absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-secondary/15 blur-3xl" />
          <div className="animate-float-slow absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  );
}
