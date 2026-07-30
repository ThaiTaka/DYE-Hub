import { Blocks } from "lucide-react";

export default function LegoSpikePage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Blocks className="h-7 w-7" />
      </div>
      <h1 className="text-xl font-semibold text-foreground">Lego Spike</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Trang tạo kịch bản bài giảng Lego Spike đang được phát triển và sẽ sớm
        ra mắt.
      </p>
    </div>
  );
}
