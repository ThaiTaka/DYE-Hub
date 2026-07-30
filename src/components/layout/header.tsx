import { Bell, GraduationCap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground md:hidden">
          <GraduationCap className="h-4 w-4" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-foreground md:text-lg">
            Bảng điều khiển giáo viên
          </h1>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Chào mừng trở lại, hôm nay bạn muốn dạy bài gì?
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          aria-label="Thông báo"
          className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            GV
          </div>
          <div className="hidden text-sm sm:block">
            <p className="font-medium leading-tight text-foreground">Cô Lan</p>
            <p className="text-xs leading-tight text-muted-foreground">Giáo viên</p>
          </div>
        </div>
      </div>
    </header>
  );
}
