import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Đăng ký - DYE Hub",
};

export default function DangKyPage() {
  return <RegisterForm />;
}
