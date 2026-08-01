"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Blocks, GraduationCap, LayoutDashboard, Gamepad2, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Bảng điều khiển", href: "/", icon: LayoutDashboard },
  { label: "Lego Spike", href: "/lego-spike", icon: Blocks },
  { label: "Python/Pygame", href: "/python-pygame", icon: Gamepad2 },
  { label: "Quản lý học viên", href: "/hoc-vien", icon: Users },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-6">
        <motion.div
          whileHover={{ rotate: -8, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/30"
        >
          <GraduationCap className="h-5 w-5" />
        </motion.div>
        <span className="bg-gradient-to-r from-sidebar-foreground to-sidebar-foreground/70 bg-clip-text text-lg font-bold tracking-tight text-transparent">
          DYE Hub
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
            >
              <Link
                href={item.href}
                onClick={onNavigate}
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
            </motion.div>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-lg bg-gradient-to-br from-accent/25 to-secondary/15 p-3"
        >
          <p className="text-xs font-semibold text-sidebar-foreground">
            Phiên bản Beta
          </p>
          <p className="mt-0.5 text-xs text-sidebar-foreground/60">
            Trợ lý soạn kịch bản bài giảng bằng AI
          </p>
        </motion.div>
      </div>
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-[250px] md:flex-col md:border-r md:border-sidebar-border md:bg-sidebar">
      <SidebarContent />
    </aside>
  );
}

export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="relative flex h-full w-[270px] max-w-[80vw] flex-col border-r border-sidebar-border bg-sidebar shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng menu"
              className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarContent onNavigate={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
