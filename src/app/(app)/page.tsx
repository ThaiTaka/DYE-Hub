"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Blocks, Gamepad2, Users, type LucideIcon } from "lucide-react";
import { InputForm } from "@/components/ui/input-form";
import { ResultDisplay } from "@/components/ui/result-display";

const quickLinks: {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}[] = [
  {
    href: "/lego-spike",
    label: "Lego Spike",
    description: "Kịch bản robot & lập trình khối",
    icon: Blocks,
    accent: "from-primary/20 to-primary/5 text-primary",
  },
  {
    href: "/python-pygame",
    label: "Python/Pygame",
    description: "Kho bài giảng lập trình game",
    icon: Gamepad2,
    accent: "from-secondary/25 to-secondary/5 text-secondary",
  },
  {
    href: "/hoc-vien",
    label: "Học viên",
    description: "Theo dõi tiến độ lớp học",
    icon: Users,
    accent: "from-accent/30 to-accent/5 text-accent-foreground",
  },
];

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleGenerate() {
    setIsGenerating(true);
    window.setTimeout(() => {
      setIsGenerating(false);
      setRefreshKey((key) => key + 1);
    }, 1200);
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Soạn bài giảng nhanh với{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent-foreground bg-clip-text text-transparent">
            trợ lý AI
          </span>
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
          Chỉ mất vài giây để có mục tiêu bài học, hướng dẫn từng bước và mã
          nguồn mẫu sẵn sàng lên lớp.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {quickLinks.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 + index * 0.07, ease: "easeOut" }}
              whileHover={{ y: -3 }}
            >
              <Link
                href={item.href}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow duration-300 hover:shadow-md hover:shadow-primary/5"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.accent} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <InputForm onGenerate={handleGenerate} isGenerating={isGenerating} />
      <ResultDisplay refreshKey={refreshKey} />
    </div>
  );
}
