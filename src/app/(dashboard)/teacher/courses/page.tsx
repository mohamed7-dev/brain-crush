import React from "react";
import { TeacherCoursesPageView } from "@/features/courses/components/views/teacher-courses-page-view";
import { getQueryClient } from "@/lib/query-client";
import { fetchCoursesQueryOptions } from "@/features/courses/lib/prefetch";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Courses",
  description: "list of all courses taught by the teacher.",
};

export default async function TeacherCoursesPage() {
  const qClient = getQueryClient();
  void qClient.prefetchInfiniteQuery(fetchCoursesQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(qClient)}>
      <TeacherCoursesPageView />
    </HydrationBoundary>
  );
}
