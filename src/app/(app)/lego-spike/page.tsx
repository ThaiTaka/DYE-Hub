"use client";

import { motion } from "framer-motion";
import { Blocks } from "lucide-react";

export default function LegoSpikePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border py-24 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <Blocks className="h-7 w-7" />
      </motion.div>
      <h1 className="text-xl font-semibold text-foreground">Lego Spike</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Trang tạo kịch bản bài giảng Lego Spike đang được phát triển và sẽ sớm
        ra mắt.
      </p>
    </motion.div>
  );
}
