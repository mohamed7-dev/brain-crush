import React from "react";
import { FetchStudentChapterSuccessRes } from "../../api/fetch-student-chapter.api";
import Stack from "@mui/material/Stack";
import { StudentChapterBannerSection } from "../sections/student-chapter-banner-section";
import { StudentChapterVideoSection } from "../sections/student-chapter-video-section";
import { StudentChapterInfoSection } from "../sections/student-chapter-info-section";
import { StudentCourseAttachmentsSection } from "../sections/student-course-attachments-section";

type StudentChapterPageViewProps = {
  chapter: FetchStudentChapterSuccessRes["data"];
};

export function StudentChapterPageView({
  chapter,
}: StudentChapterPageViewProps) {
  console.log(chapter);
  const completeOnEnd =
    !!chapter.course.purchases && !chapter.progresses?.isCompleted;
  const isLocked = !chapter.isFree && !chapter.course.purchases;

  return (
    <Stack sx={{ gap: 4, p: { md: 6, xs: 2 } }}>
      <StudentChapterBannerSection chapter={chapter} isLocked={isLocked} />
      <Stack sx={{ maxWidth: "2xl", gap: 4 }}>
        <StudentChapterVideoSection
          chapter={chapter}
          isLocked={isLocked}
          completeOnEnd={completeOnEnd}
        />
        <StudentChapterInfoSection chapter={chapter} isLocked={isLocked} />
        <StudentCourseAttachmentsSection chapter={chapter} />
      </Stack>
    </Stack>
  );
}
