import React from "react";
import { Box } from "@mui/material";
import { TeacherCoursesDatagridSection } from "../teacher-courses-datagrid-section";

export function TeacherCoursesPageView() {
  return (
    <Box sx={{ p: { md: 6, xs: 2 } }}>
      <TeacherCoursesDatagridSection />
    </Box>
  );
}
