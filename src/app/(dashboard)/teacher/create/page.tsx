import React from "react";
import { CreateCoursePageView } from "@/features/courses/components/views/create-course-page-view";
import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Create new course",
  description: "Share your knowledge with your students.",
};

export default function TeacherCreateCoursePage() {
  return <CreateCoursePageView />;
}
