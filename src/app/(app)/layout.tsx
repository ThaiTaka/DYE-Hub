import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { PageTransition } from "@/components/layout/page-transition";
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

  return (
    <>
      <Sidebar />
      <div className="flex min-h-full flex-col md:pl-[250px]">
        <Header user={headerUser} />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </>
  );
}
