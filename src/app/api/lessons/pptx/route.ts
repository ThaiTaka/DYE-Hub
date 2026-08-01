import { NextRequest, NextResponse } from "next/server";
import PptxGenJS from "pptxgenjs";
import { LessonSchema } from "@/lib/lesson-schema";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = LessonSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const lesson = parsed.data;
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "DYE_HUB", width: 10, height: 5.63 });
  pptx.layout = "DYE_HUB";

  const title = pptx.addSlide();
  title.background = { color: "1E1B4B" };
  title.addText(lesson.title, {
    x: 0.6,
    y: 2,
    w: 8.8,
    h: 1.4,
    fontSize: 34,
    bold: true,
    color: "FFFFFF",
    align: "center",
    fontFace: "Calibri",
  });
  title.addText("DYE Hub — Kịch bản bài giảng", {
    x: 0.6,
    y: 3.4,
    w: 8.8,
    h: 0.5,
    fontSize: 16,
    color: "C7D2FE",
    align: "center",
    fontFace: "Calibri",
  });

  for (const slide of lesson.slides) {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText(slide.title, {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.8,
      fontSize: 26,
      bold: true,
      color: "1E1B4B",
      fontFace: "Calibri",
    });
    s.addText(
      slide.bullets.map((bullet) => ({
        text: bullet,
        options: { bullet: { code: "2022" }, breakLine: true },
      })),
      {
        x: 0.5,
        y: 1.4,
        w: 9,
        h: 3.8,
        fontSize: 18,
        color: "334155",
        fontFace: "Calibri",
        valign: "top",
      }
    );
  }

  const buffer = (await pptx.write({ outputType: "nodebuffer" })) as Buffer;
  const filename = `${lesson.title.replace(/[\\/:*?"<>|]/g, "").trim() || "bai-giang"}.pptx`;

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
