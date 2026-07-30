"use client";

import { motion } from "framer-motion";
import { Bell, GraduationCap, LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";

interface HeaderProps {
  user: { email: string; fullName?: string } | null;
}

function getInitials(label: string) {
  const parts = label.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Header({ user }: HeaderProps) {
  const displayName = user?.fullName || user?.email || "Khách";
  const initials = getInitials(user?.fullName || user?.email || "GV");

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur md:px-8"
    >
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
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
          </span>
        </button>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {initials}
          </div>
          <div className="hidden text-sm sm:block">
            <p className="max-w-[10rem] truncate font-medium leading-tight text-foreground">
              {displayName}
            </p>
            <p className="text-xs leading-tight text-muted-foreground">
              Giáo viên
            </p>
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            aria-label="Đăng xuất"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </form>
      </div>
    </motion.header>
  );
}
