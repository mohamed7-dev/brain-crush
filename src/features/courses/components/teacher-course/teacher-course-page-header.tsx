import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";

type TeacherCoursePageHeaderProps = {
  course: FetchCourseSuccessRes["data"];
};

export function TeacherCoursePageHeader({
  course,
}: TeacherCoursePageHeaderProps) {
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <Box>
      <Typography component={"h1"} variant="h1">
        Course setup
      </Typography>
      <Typography component={"p"} variant="subtitle1">
        Complete all fields {completionText}
      </Typography>
    </Box>
  );
}
