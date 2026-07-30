import { Users } from "lucide-react";

export default function HocVienPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/25 text-accent-foreground">
        <Users className="h-7 w-7" />
      </div>
      <h1 className="text-xl font-semibold text-foreground">
        Quản lý học viên
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Tính năng quản lý học viên đang được phát triển và sẽ sớm ra mắt.
      </p>
    </div>
  );
}
