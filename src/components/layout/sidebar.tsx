"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Blocks, GraduationCap, LayoutDashboard, Gamepad2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Bảng điều khiển", href: "/", icon: LayoutDashboard },
  { label: "Lego Spike", href: "/lego-spike", icon: Blocks },
  { label: "Python/Pygame", href: "/python-pygame", icon: Gamepad2 },
  { label: "Quản lý học viên", href: "/hoc-vien", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-[250px] md:flex-col md:border-r md:border-sidebar-border md:bg-sidebar">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-6">
        <motion.div
          whileHover={{ rotate: -8, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <GraduationCap className="h-5 w-5" />
        </motion.div>
        <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
          DYE Hub
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-accent-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-lg bg-sidebar-primary shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {!isActive && (
                <span className="absolute inset-0 rounded-lg bg-sidebar-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              )}
              <Icon className="relative z-10 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-accent/25 p-3">
          <p className="text-xs font-semibold text-sidebar-foreground">
            Phiên bản Beta
          </p>
          <p className="mt-0.5 text-xs text-sidebar-foreground/60">
            Trợ lý soạn kịch bản bài giảng bằng AI
          </p>
        </div>
      </div>
    </aside>
  );
}
