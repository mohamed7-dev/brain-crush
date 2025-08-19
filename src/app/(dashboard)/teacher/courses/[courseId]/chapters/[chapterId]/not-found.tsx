import React from "react";
import { routes } from "@/lib/routes";
import { NotFoundPlaceholder } from "@/components/not-found-placeholder";

export default function TeacherCourseChapterNotFoundPage() {
  return (
    <NotFoundPlaceholder
      buttonLabel="Go back"
      path={routes.teacherCourses}
      message="Course chapter not found"
    />
  );
}
