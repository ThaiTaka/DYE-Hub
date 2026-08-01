import { Users } from "lucide-react";
import { ComingSoon } from "@/components/ui/coming-soon";

export default function HocVienPage() {
  return (
    <ComingSoon
      icon={Users}
      title="Quản lý học viên"
      description="Tính năng quản lý học viên đang được phát triển và sẽ sớm ra mắt."
      iconClassName="bg-accent/25 text-accent-foreground"
      features={["Hồ sơ học viên", "Theo dõi tiến độ", "Điểm danh lớp học"]}
    />
  );
}
