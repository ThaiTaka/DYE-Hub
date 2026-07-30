"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface InputFormProps {
  onGenerate: () => void;
  isGenerating: boolean;
}

export function InputForm({ onGenerate, isGenerating }: InputFormProps) {
  const [topic, setTopic] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onGenerate();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -2 }}
    >
      <Card className="border-primary/10 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <motion.span
              animate={{ rotate: [0, 12, -6, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="h-5 w-5 text-secondary" />
            </motion.span>
            Trợ lý soạn kịch bản bài giảng
          </CardTitle>
          <CardDescription>
            Nhập chủ đề bạn muốn dạy, AI sẽ gợi ý mục tiêu bài học, các bước
            hướng dẫn và mã nguồn mẫu phù hợp với học viên nhỏ tuổi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Nhập chủ đề bài giảng, ví dụ: Lập trình xe di chuyển với Lego Spike..."
              className="min-h-[120px] resize-none text-base transition-shadow focus-visible:shadow-md"
            />
            <div className="flex justify-end">
              <motion.div
                whileHover={{ scale: isGenerating ? 1 : 1.03 }}
                whileTap={{ scale: isGenerating ? 1 : 0.97 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={isGenerating}
                  className="gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Đang tạo kịch bản...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Tạo Kịch Bản
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
