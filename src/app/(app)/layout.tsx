import { AppShell } from "@/components/layout/app-shell";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const headerUser = user
    ? {
        email: user.email ?? "",
        fullName: (user.user_metadata?.full_name as string | undefined) ?? undefined,
      }
    : null;

  return <AppShell user={headerUser}>{children}</AppShell>;
}
