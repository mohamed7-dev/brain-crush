import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { TeacherCoursePageHeader } from "../teacher-course/teacher-course-page-header";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import { UpdateTitleForm } from "../forms/update-title-form";
import { BadgeBar } from "../teacher-course/badge-bar";

type TeacherCoursePageViewProps = {
  course: FetchCourseSuccessRes["data"];
};
export function TeacherCoursePageView({ course }: TeacherCoursePageViewProps) {
  return (
    <Stack sx={{ p: 6, gap: 6 }}>
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <TeacherCoursePageHeader course={course} />
        <p>publish/delete</p>
      </Stack>
      <Grid container columns={13} columnGap={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <BadgeBar />
          <Stack sx={{ gap: 2, mt: 4 }}>
            <UpdateTitleForm defaultTitle={course.title} />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>Column2</Grid>
      </Grid>
    </Stack>
  );
}
