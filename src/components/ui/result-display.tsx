"use client";

import { useState } from "react";
import { Check, CheckCircle2, Copy, Gamepad2, ListChecks, Target } from "lucide-react";
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

SyntaxHighlighter.registerLanguage("python", python);

const lessonTitle = "Pygame Cơ bản: Điều khiển nhân vật";

const lessonObjective =
  "Sau bài học này, em sẽ tự tạo được một cửa sổ trò chơi bằng Pygame và điều khiển một nhân vật di chuyển qua lại bằng 4 phím mũi tên trên bàn phím.";

const lessonSteps = [
  "Cài đặt thư viện Pygame và khởi tạo cửa sổ trò chơi với kích thước mong muốn.",
  "Chọn màu nền và màu cho nhân vật, đặt vị trí ban đầu của nhân vật ở giữa màn hình.",
  "Tạo vòng lặp trò chơi (game loop) chạy liên tục bằng lệnh while True.",
  "Lắng nghe sự kiện bàn phím: khi nhấn phím mũi tên trái/phải/lên/xuống thì thay đổi tọa độ x, y của nhân vật.",
  "Giới hạn nhân vật trong màn hình để nhân vật không bị đi ra ngoài khung hình.",
  "Vẽ lại nền và nhân vật ở vị trí mới, sau đó cập nhật màn hình hiển thị.",
  "Kiểm tra sự kiện đóng cửa sổ (QUIT) để thoát vòng lặp một cách an toàn.",
];

const sampleCode = `import pygame
import sys

pygame.init()

MAN_HINH_RONG = 800
MAN_HINH_CAO = 600
man_hinh = pygame.display.set_mode((MAN_HINH_RONG, MAN_HINH_CAO))
pygame.display.set_caption("Pygame Co Ban - Dieu Khien Nhan Vat")

mau_nen = (135, 206, 235)
mau_nhan_vat = (255, 87, 34)

x = MAN_HINH_RONG // 2
y = MAN_HINH_CAO // 2
toc_do = 5
kich_thuoc = 40

dong_ho = pygame.time.Clock()

while True:
    for su_kien in pygame.event.get():
        if su_kien.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    phim = pygame.key.get_pressed()
    if phim[pygame.K_LEFT]:
        x -= toc_do
    if phim[pygame.K_RIGHT]:
        x += toc_do
    if phim[pygame.K_UP]:
        y -= toc_do
    if phim[pygame.K_DOWN]:
        y += toc_do

    x = max(0, min(x, MAN_HINH_RONG - kich_thuoc))
    y = max(0, min(y, MAN_HINH_CAO - kich_thuoc))

    man_hinh.fill(mau_nen)
    pygame.draw.rect(man_hinh, mau_nhan_vat, (x, y, kich_thuoc, kich_thuoc))
    pygame.display.update()
    dong_ho.tick(60)
`;

export function ResultDisplay() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card className="overflow-hidden border-primary/10 shadow-sm">
      <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 via-transparent to-secondary/5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Kịch bản đã sẵn sàng!</CardTitle>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1 text-xs font-medium text-secondary">
            <Gamepad2 className="h-3.5 w-3.5" />
            {lessonTitle}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        <section>
          <div className="mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Mục tiêu bài học
            </h3>
          </div>
          <p className="rounded-lg bg-primary/5 p-4 text-sm leading-relaxed text-foreground/80">
            {lessonObjective}
          </p>
        </section>

        <Separator />

        <section>
          <div className="mb-3 flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-secondary" />
            <h3 className="text-sm font-semibold text-foreground">
              Hướng dẫn từng bước
            </h3>
          </div>
          <ol className="space-y-3">
            {lessonSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-xs font-bold text-secondary">
                  {index + 1}
                </span>
                <p className="pt-0.5 text-sm leading-relaxed text-foreground/80">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <Separator />

        <section>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4 text-accent-foreground" />
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
                  dieu_khien_nhan_vat.py
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Đã sao chép
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Sao chép
                  </>
                )}
              </button>
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
              {sampleCode}
            </SyntaxHighlighter>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
