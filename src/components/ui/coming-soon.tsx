"use client";

import { motion } from "framer-motion";
import { Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComingSoonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconClassName?: string;
  features: string[];
}

export function ComingSoon({
  icon: Icon,
  title,
  description,
  iconClassName,
  features,
}: ComingSoonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative mx-auto flex w-full max-w-2xl flex-col items-center overflow-hidden rounded-2xl border border-dashed border-border py-20 text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_65%)] opacity-[0.06]"
      />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm",
          iconClassName
        )}
      >
        <Icon className="h-8 w-8" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="mt-5 text-xl font-semibold text-foreground"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="mt-2 max-w-sm text-sm text-muted-foreground"
      >
        {description}
      </motion.p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-2 px-6">
        {features.map((feature, index) => (
          <motion.span
            key={feature}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + index * 0.08, duration: 0.3, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-sm"
          >
            <Sparkles className="h-3 w-3 text-secondary" />
            {feature}
          </motion.span>
        ))}
      </div>

      <div className="mt-8 h-1.5 w-[220px] max-w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground/70">Đang được phát triển</p>
    </motion.div>
  );
}
