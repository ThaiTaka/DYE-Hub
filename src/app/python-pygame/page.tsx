import { Gamepad2 } from "lucide-react";

export default function PythonPygamePage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary">
        <Gamepad2 className="h-7 w-7" />
      </div>
      <h1 className="text-xl font-semibold text-foreground">Python/Pygame</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Kho bài giảng Python và Pygame đang được phát triển và sẽ sớm ra mắt.
      </p>
    </div>
  );
}
