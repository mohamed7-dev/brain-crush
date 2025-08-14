import React from "react";
import { fetchCoursesAnalytics } from "@/features/courses/api/fetch-courses-analytics.api";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { CoursesAnalyticsPageView } from "@/features/courses/components/views/courses-analytics-page-view";

export default async function AnalyticsPage() {
  const res = await fetchCoursesAnalytics();
  if ("error" in res) {
    if (res.statusCode === 401) return redirect(routes.home);

    throw new Error(res.message);
  }
  const stats = res.data;
  return <CoursesAnalyticsPageView stats={stats} />;
}
