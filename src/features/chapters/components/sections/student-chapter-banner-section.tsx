import React from "react";
import { Alert, Stack } from "@mui/material";
import { FetchStudentChapterSuccessRes } from "../../api/fetch-student-chapter.api";

type StudentChapterBannerSectionProps = {
  chapter: FetchStudentChapterSuccessRes["data"];
  isLocked: boolean;
};

export function StudentChapterBannerSection({
  chapter,
  isLocked,
}: StudentChapterBannerSectionProps) {
  return (
    <Stack>
      {chapter.progresses?.isCompleted && (
        <Alert variant="outlined" color="success">
          You already completed this chapter.
        </Alert>
      )}
      {isLocked && (
        <Alert variant="outlined" color="warning">
          You need to purchase this course to watch this chapter.
        </Alert>
      )}
    </Stack>
  );
}
