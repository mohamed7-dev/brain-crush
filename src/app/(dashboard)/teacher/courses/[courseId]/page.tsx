import React from "react";
import { TeacherCoursePageView } from "@/features/courses/components/views/teacher-course-page-view";
import { fetchCourse } from "@/features/courses/api/fetch-course.api";
import { notFound } from "next/navigation";
import { getQueryClient } from "@/lib/query-client";
import { fetchCategoriesQueryOptions } from "@/features/categories/lib/prefetch";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type TeacherCoursePageProps = {
  params: Promise<{ courseId: string }>;
};
export default async function TeacherCoursePage({
  params,
}: TeacherCoursePageProps) {
  const courseId = (await params).courseId;
  const foundCourse = await fetchCourse({ id: courseId });
  if ("error" in foundCourse) {
    if (foundCourse.statusCode === 404) return notFound();
    throw new Error(foundCourse.message);
  }

  const client = getQueryClient();
  void client.prefetchInfiniteQuery(fetchCategoriesQueryOptions);

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <TeacherCoursePageView course={foundCourse.data} />
    </HydrationBoundary>
  );
}
