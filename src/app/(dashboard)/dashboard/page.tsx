import React from "react";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { getQueryClient } from "@/lib/query-client";
import { getStudentPurchasedCoursesQueryOptions } from "@/features/courses/lib/prefetch";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { StudentDashboardPageView } from "@/features/courses/components/views/student-dashboard-page-view";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect(routes.home);
  }

  const qClient = getQueryClient();
  void qClient.prefetchInfiniteQuery(getStudentPurchasedCoursesQueryOptions);

  return (
    <HydrationBoundary state={dehydrate(qClient)}>
      <StudentDashboardPageView />
    </HydrationBoundary>
  );
}
