import React from "react";
import { Button } from "@mui/material";
import { routes } from "@/lib/routes";

export function TeacherCoursesPageView() {
  return <Button href={routes.teacherCreateCourse}>Create New Course</Button>;
}
