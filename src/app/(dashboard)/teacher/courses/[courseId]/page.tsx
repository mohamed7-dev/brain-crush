import React from "react";
import { TeacherCoursePageView } from "@/features/courses";
import { fetchCourse } from "@/features/courses/api/fetch-course.api";
import { notFound } from "next/navigation";

type TeacherCoursePageProps = {
  params: Promise<{ courseId: string }>;
};
export default async function TeacherCoursePage({
  params,
}: TeacherCoursePageProps) {
  const courseId = (await params).courseId;
  const res = await fetchCourse({ id: courseId });
  if ("error" in res) {
    if (res.statusCode === 404) return notFound();
    throw new Error(res.message);
  }
  const foundCourse = res.data;

  return <TeacherCoursePageView course={foundCourse} />;
}
