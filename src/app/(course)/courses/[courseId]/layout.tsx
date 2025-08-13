import React, { cache } from "react";
import { CourseLayoutView } from "@/features/app-shell/components/views/course-layout-view";
import { fetchCourseChapters } from "@/features/courses/api/fetch-course-chapters.api";
import { notFound } from "next/navigation";

type CourseLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
};

export const cachedGetCourseChapters = cache(fetchCourseChapters);

export default async function CourseLayout({
  children,
  params,
}: CourseLayoutProps) {
  const courseId = (await params).courseId;
  const foundCourse = await cachedGetCourseChapters({ id: courseId });
  if ("error" in foundCourse) {
    if (foundCourse.statusCode === 404) return notFound();
    throw new Error(foundCourse.message);
  }
  return (
    <CourseLayoutView course={foundCourse.data}>{children}</CourseLayoutView>
  );
}
