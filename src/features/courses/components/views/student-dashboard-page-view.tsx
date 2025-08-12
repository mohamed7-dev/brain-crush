import React from "react";
import Stack from "@mui/material/Stack";
import { StudentCoursesInfoSection } from "../sections/student-courses-info-section";
import { fetchStudentCoursesStats } from "../../api/fetch-student-courses-stats.api";
import { StudentCoursesSection } from "../sections/student-courses-section";

export async function StudentDashboardPageView() {
  const res = await fetchStudentCoursesStats();
  if ("error" in res) {
    throw new Error(res.message);
  }
  return (
    <Stack sx={{ p: 4, gap: 4 }}>
      <StudentCoursesInfoSection
        completedCoursesLength={res.data[0].completedCourses}
        inProgressCoursesLength={res.data[0].inProgressCourses}
      />
      <StudentCoursesSection />
    </Stack>
  );
}
