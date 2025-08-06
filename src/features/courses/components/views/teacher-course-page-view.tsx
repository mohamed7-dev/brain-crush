import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { TeacherCoursePageHeader } from "../teacher-course/teacher-course-page-header";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import { UpdateTitleForm } from "../forms/update-title-form";
import { BadgeBar } from "../teacher-course/badge-bar";
import { UpdateDescriptionForm } from "../forms/update-description-form";
import { UpdateCourseCoverImage } from "../forms/update-course-cover-form";
import { UpdateCourseCategoryForm } from "../forms/update-course-category-form";
import { DashboardOutlined, MoneyOutlined } from "@mui/icons-material";
import { CoursePriceForm } from "../forms/course-price-form";

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
          <BadgeBar icon={DashboardOutlined} label="Customize your course" />
          <Stack sx={{ gap: 2, mt: 4 }}>
            <UpdateTitleForm defaultTitle={course.title} courseId={course.id} />
            <UpdateDescriptionForm
              defaultDescription={course.description}
              courseId={course.id}
            />
            <UpdateCourseCoverImage
              defaultImageUrl={course.imageUrl}
              courseId={course.id}
            />
            <UpdateCourseCategoryForm
              defaultCategoryId={course.categoryId}
              courseId={course.id}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack sx={{ gap: 2 }}>
            <>TODO: add chapters here</>
            <Stack sx={{ gap: 2 }}>
              <BadgeBar icon={MoneyOutlined} label="Sell your course" />
              <CoursePriceForm
                defaultPrice={course.price}
                courseId={course.id}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
