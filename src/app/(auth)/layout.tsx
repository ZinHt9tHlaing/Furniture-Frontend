import { AuthGuard } from "@/components/auth/auth-guard";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedIn = await AuthGuard();

  if (loggedIn) {
    redirect("/");
  }

  return <main className="min-h-screen">{children}</main>;
}
