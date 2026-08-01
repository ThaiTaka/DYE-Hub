import { Blocks } from "lucide-react";
import { ComingSoon } from "@/components/ui/coming-soon";

export default function LegoSpikePage() {
  return (
    <ComingSoon
      icon={Blocks}
      title="Lego Spike"
      description="Trang tạo kịch bản bài giảng Lego Spike đang được phát triển và sẽ sớm ra mắt."
      iconClassName="bg-primary/10 text-primary"
      features={["Thư viện khối lệnh", "Kịch bản theo chủ đề", "Xuất PDF cho lớp học"]}
    />
  );
}
