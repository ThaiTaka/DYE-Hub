import { Gamepad2 } from "lucide-react";
import { ComingSoon } from "@/components/ui/coming-soon";

export default function PythonPygamePage() {
  return (
    <ComingSoon
      icon={Gamepad2}
      title="Python/Pygame"
      description="Kho bài giảng Python và Pygame đang được phát triển và sẽ sớm ra mắt."
      iconClassName="bg-secondary/15 text-secondary"
      features={["Bài mẫu theo cấp độ", "Thư viện mã nguồn", "Bài tập luyện tập"]}
    />
  );
}
