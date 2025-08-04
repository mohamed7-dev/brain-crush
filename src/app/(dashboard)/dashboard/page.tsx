import { routes } from "@/lib/routes";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect(routes.home);
  }

  return <div>DashboardPage</div>;
}
