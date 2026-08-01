import { z } from "zod";

export const LessonSchema = z.object({
  title: z.string().describe("Tên bài học, ngắn gọn"),
  objective: z
    .string()
    .describe("Mục tiêu bài học dành cho học sinh, 2-3 câu"),
  steps: z
    .array(z.string())
    .describe(
      "Hướng dẫn giảng dạy từng bước cho giáo viên, mỗi phần tử là một bước hành động rõ ràng"
    ),
  sampleCode: z.object({
    language: z
      .enum(["python", "text"])
      .describe(
        "'python' nếu chủ đề liên quan đến lập trình, ngược lại 'text'"
      ),
    filename: z.string().describe("Tên file mã nguồn mẫu, ví dụ bai_hoc.py"),
    code: z
      .string()
      .describe(
        "Mã nguồn mẫu minh hoạ cho bài học; để chuỗi rỗng nếu chủ đề không liên quan đến viết mã"
      ),
  }),
  slides: z
    .array(
      z.object({
        title: z.string().describe("Tiêu đề trang trình chiếu"),
        bullets: z
          .array(z.string())
          .describe("Các gạch đầu dòng súc tích trên trang trình chiếu"),
      })
    )
    .describe(
      "Nội dung bài trình chiếu PowerPoint cho giáo viên, khoảng 5-7 trang"
    ),
});

export type Lesson = z.infer<typeof LessonSchema>;
