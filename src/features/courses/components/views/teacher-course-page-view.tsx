import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { TeacherCoursePageHeader } from "../teacher-course/teacher-course-page-header";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import { UpdateTitleForm } from "../forms/update-title-form";
import { BadgeBar } from "../teacher-course/badge-bar";
import { UpdateDescriptionForm } from "../forms/update-description-form";
import {
  DashboardOutlined,
  FilePresentOutlined,
  ListOutlined,
  MoneyOutlined,
} from "@mui/icons-material";
import { CoursePriceForm } from "../forms/course-price-form";
import { CourseChaptersSection } from "../teacher-course/course-chapters-section";
import { CourseAttachmentsSection } from "../teacher-course/course-attachments-section";
import { CourseCoverImageSection } from "../teacher-course/course-cover-image-section";
import { CourseCategorySection } from "../teacher-course/course-category-section";

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
            <CourseCoverImageSection
              defaultImageUrl={course.imageUrl}
              courseId={course.id}
            />
            <CourseCategorySection
              defaultCategoryId={course.categoryId}
              courseId={course.id}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack sx={{ gap: 2 }}>
            <Stack sx={{ gap: 2 }}>
              <BadgeBar icon={ListOutlined} label="Course chapters" />
              <CourseChaptersSection
                defaultChapters={course.chapters}
                courseId={course.id}
              />
            </Stack>
            <Stack sx={{ gap: 2 }}>
              <BadgeBar icon={MoneyOutlined} label="Sell your course" />
              <CoursePriceForm
                defaultPrice={course.price}
                courseId={course.id}
              />
            </Stack>
            <Stack sx={{ gap: 2 }}>
              <BadgeBar icon={FilePresentOutlined} label="Add attachments" />
              <CourseAttachmentsSection
                defaultAttachments={course.attachments}
                courseId={course.id}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
