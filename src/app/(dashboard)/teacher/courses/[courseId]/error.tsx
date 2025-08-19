"use client";
import { ErrorPlaceholder } from "@/components/error-placeholder";
import { routes } from "@/lib/routes";
import React from "react";

export default function TeacherCourseErrorPage({ error }: { error: Error }) {
  return (
    <ErrorPlaceholder
      error={error}
      actionButtonLabel="Go back to courses page"
      actionButtonPath={routes.teacherCourses}
    />
  );
}
