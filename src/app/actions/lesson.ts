"use server";

import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { createClient } from "@/lib/anthropic/client";
import { LessonSchema, type Lesson } from "@/lib/lesson-schema";

export interface GenerateLessonState {
  lesson?: Lesson;
  error?: string;
}

const SYSTEM_PROMPT = `Bạn là trợ lý soạn giáo án cho giáo viên dạy lập trình và robot (Lego Spike, Python, Pygame) tại một trung tâm giáo dục STEM tên DYE Hub, đối tượng học sinh tiểu học và trung học cơ sở.

Khi nhận một chủ đề bài giảng, hãy soạn:
- Mục tiêu bài học: ngắn gọn, dễ hiểu với học sinh nhỏ tuổi.
- Các bước hướng dẫn giảng dạy theo trình tự, mỗi bước là một câu hành động rõ ràng dành cho giáo viên đứng lớp.
- Một đoạn mã nguồn mẫu bằng Python minh hoạ cho bài học nếu chủ đề liên quan đến lập trình; nếu chủ đề không liên quan đến việc viết mã, để trường code là chuỗi rỗng và language là "text".
- Nội dung cho một bài trình chiếu PowerPoint để giáo viên trình bày trên lớp: khoảng 5-7 trang, mỗi trang có tiêu đề ngắn và 3-5 gạch đầu dòng súc tích (tóm tắt lại nội dung, không chép nguyên văn các bước hướng dẫn).

Luôn trả lời bằng tiếng Việt, giọng văn thân thiện và phù hợp môi trường giáo dục.`;

export async function generateLesson(
  topic: string
): Promise<GenerateLessonState> {
  const trimmed = topic.trim();
  if (!trimmed) {
    return { error: "Vui lòng nhập chủ đề bài giảng." };
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      error:
        "Chưa cấu hình ANTHROPIC_API_KEY trên máy chủ. Vui lòng thêm biến môi trường này vào .env.local rồi khởi động lại server.",
    };
  }

  try {
    const client = createClient();
    const response = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 8000,
      output_config: {
        effort: "medium",
        format: zodOutputFormat(LessonSchema),
      },
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Chủ đề bài giảng: ${trimmed}` }],
    });

    if (response.stop_reason === "refusal") {
      return {
        error:
          "AI từ chối tạo nội dung cho chủ đề này. Vui lòng thử một chủ đề khác.",
      };
    }

    if (!response.parsed_output) {
      return { error: "Không thể tạo kịch bản, vui lòng thử lại." };
    }

    return { lesson: response.parsed_output };
  } catch (error) {
    console.error("generateLesson failed", error);
    return { error: "Đã xảy ra lỗi khi tạo kịch bản. Vui lòng thử lại sau." };
  }
}
