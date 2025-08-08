import React from "react";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { userOnly } from "@/features/me/lib/authorization";

export default async function DashboardPage() {
  const { userId } = await userOnly();

  if (!userId) {
    return redirect(routes.home);
  }

  return <div>DashboardPage</div>;
}
