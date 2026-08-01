"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Copy,
  FileText,
  ListChecks,
  Loader2,
  Presentation,
  Target,
} from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Lesson } from "@/lib/lesson-schema";

SyntaxHighlighter.registerLanguage("python", python);

const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: "easeOut" as const },
  }),
};

interface ResultDisplayProps {
  lesson: Lesson;
  refreshKey: number;
}

export function ResultDisplay({ lesson, refreshKey }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const hasCode = lesson.sampleCode.code.trim().length > 0;

  async function handleCopy() {
    await navigator.clipboard.writeText(lesson.sampleCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDownloadPptx() {
    setDownloading(true);
    setDownloadError(false);
    try {
      const response = await fetch("/api/lessons/pptx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lesson),
      });
      if (!response.ok) throw new Error("Failed to generate pptx");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${lesson.title || "bai-giang"}.pptx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setDownloadError(true);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
    >
      <Card className="overflow-hidden border-primary/10 shadow-sm">
        <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 via-transparent to-secondary/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <motion.span
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.2 }}
              >
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </motion.span>
              <CardTitle className="text-lg">Kịch bản đã sẵn sàng!</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1 text-xs font-medium text-secondary">
                <FileText className="h-3.5 w-3.5" />
                {lesson.title}
              </span>
              <motion.button
                type="button"
                onClick={handleDownloadPptx}
                disabled={downloading}
                whileHover={{ scale: downloading ? 1 : 1.03 }}
                whileTap={{ scale: downloading ? 1 : 0.97 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/85 disabled:opacity-60"
              >
                {downloading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Presentation className="h-3.5 w-3.5" />
                )}
                Tải PowerPoint
              </motion.button>
            </div>
          </div>
          {downloadError && (
            <p className="mt-2 text-xs text-destructive">
              Không thể tạo file PowerPoint, vui lòng thử lại.
            </p>
          )}
        </CardHeader>

        <CardContent className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div key={refreshKey} className="space-y-6">
              <motion.section
                custom={0}
                variants={sectionVariants}
                initial="hidden"
                animate="show"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Mục tiêu bài học
                  </h3>
                </div>
                <p className="rounded-lg bg-primary/5 p-4 text-sm leading-relaxed text-foreground/80">
                  {lesson.objective}
                </p>
              </motion.section>

              <Separator />

              <motion.section
                custom={0.1}
                variants={sectionVariants}
                initial="hidden"
                animate="show"
              >
                <div className="mb-3 flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-secondary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Hướng dẫn từng bước
                  </h3>
                </div>
                <ol className="space-y-3">
                  {lesson.steps.map((step, index) => (
                    <motion.li
                      key={step}
                      custom={0.15 + index * 0.05}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="show"
                      className="flex items-start gap-3"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-xs font-bold text-secondary">
                        {index + 1}
                      </span>
                      <p className="pt-0.5 text-sm leading-relaxed text-foreground/80">
                        {step}
                      </p>
                    </motion.li>
                  ))}
                </ol>
              </motion.section>

              {hasCode && (
                <>
                  <Separator />
                  <motion.section
                    custom={0.2}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="show"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-accent-foreground" />
                        <h3 className="text-sm font-semibold text-foreground">
                          Mã nguồn mẫu
                        </h3>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-border bg-[#282c34]">
                      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                          <span className="ml-2 font-mono text-xs text-white/50">
                            {lesson.sampleCode.filename}
                          </span>
                        </div>
                        <motion.button
                          type="button"
                          onClick={handleCopy}
                          whileTap={{ scale: 0.92 }}
                          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {copied ? (
                              <motion.span
                                key="copied"
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center gap-1.5"
                              >
                                <Check className="h-3.5 w-3.5" />
                                Đã sao chép
                              </motion.span>
                            ) : (
                              <motion.span
                                key="copy"
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center gap-1.5"
                              >
                                <Copy className="h-3.5 w-3.5" />
                                Sao chép
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </div>
                      <SyntaxHighlighter
                        language="python"
                        style={oneDark}
                        customStyle={{
                          margin: 0,
                          background: "transparent",
                          padding: "1rem",
                          fontSize: "0.8125rem",
                        }}
                        showLineNumbers
                      >
                        {lesson.sampleCode.code}
                      </SyntaxHighlighter>
                    </div>
                  </motion.section>
                </>
              )}

              <Separator />

              <motion.section
                custom={0.25}
                variants={sectionVariants}
                initial="hidden"
                animate="show"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Presentation className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Nội dung trình chiếu ({lesson.slides.length} trang)
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {lesson.slides.map((slide, index) => (
                    <motion.div
                      key={slide.title}
                      custom={0.3 + index * 0.05}
                      variants={sectionVariants}
                      initial="hidden"
                      animate="show"
                      className="rounded-lg border border-border bg-muted/30 p-3"
                    >
                      <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[0.65rem] text-primary">
                          {index + 1}
                        </span>
                        {slide.title}
                      </p>
                      <ul className="space-y-1 pl-1 text-xs text-muted-foreground">
                        {slide.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-1.5">
                            <span className="text-primary">•</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
