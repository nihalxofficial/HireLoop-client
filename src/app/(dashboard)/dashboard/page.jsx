import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUserSession();
  return (
    redirect(`/dashboard/${user?.role}`)
  );
}