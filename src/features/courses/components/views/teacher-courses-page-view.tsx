import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { routes } from "@/lib/routes";
import { CoursesDatagridSection } from "../sections/courses-datagrid-section";
import { AddOutlined } from "@mui/icons-material";

export function TeacherCoursesPageView() {
  return (
    <Box sx={{ p: 6 }}>
      <CoursesDatagridSection />
    </Box>
  );
}
