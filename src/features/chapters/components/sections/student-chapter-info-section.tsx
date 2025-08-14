"use client";
import React from "react";
import { FetchStudentChapterSuccessRes } from "../../api/fetch-student-chapter.api";
import { Box, Button, Stack, Typography } from "@mui/material";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { formatPrice } from "@/lib/utils";
import { useEnrollUser } from "@/features/courses/hooks/use-enroll-user";
import { useProgressChapter } from "../../hooks/use-progress-chapter";
import { AuthButtonWrapper } from "@/components/auth-button-wrapper";

type ProgressButtonProps = {
  isCompleted: boolean;
  chapter: StudentChapterInfoSectionProps["chapter"];
};
function ProgressButton({ isCompleted, chapter }: ProgressButtonProps) {
  const Icon = isCompleted ? CloseOutlined : CheckOutlined;

  const { mutateAsync: progressChapter, isPending } = useProgressChapter(
    chapter,
    {}
  );
  const handleProgress = async () => {
    await progressChapter({
      chapterId: chapter.id,
      courseId: chapter.courseId,
      isCompleted: !isCompleted,
    });
  };
  const buttonLabel = isCompleted ? "Not completed" : "Mark as complete";
  return (
    <AuthButtonWrapper buttonLabel={buttonLabel} useDefaultIcon={false}>
      <Button
        onClick={handleProgress}
        variant="outlined"
        color={isCompleted ? "success" : "secondary"}
        disabled={isPending}
        loading={isPending}
        endIcon={<Icon />}
      >
        {buttonLabel}
      </Button>
    </AuthButtonWrapper>
  );
}

function EnrollButton({
  chapter,
}: Pick<StudentChapterInfoSectionProps, "chapter">) {
  const { showSnackbar } = useSnackbar();
  const { mutateAsync: enrollUser } = useEnrollUser({
    onSuccess: (data) => {
      if (data.data.sessionUrl) {
        window.location.assign(data.data.sessionUrl);
      }
      showSnackbar({ message: data.message, severity: "success" });
    },
    onError: (error) => {
      showSnackbar({ message: error.message, severity: "error" });
    },
  });
  const handleEnrolling = async () => {
    await enrollUser({ courseId: chapter.courseId });
  };
  const buttonLabel = `Enroll for ${formatPrice(chapter.course.price!)}`;
  return (
    <AuthButtonWrapper buttonLabel={buttonLabel} useDefaultIcon={false}>
      <Button onClick={handleEnrolling} variant="outlined" disabled={false}>
        {buttonLabel}
      </Button>
    </AuthButtonWrapper>
  );
}

function Description({
  chapter,
}: Pick<StudentChapterInfoSectionProps, "chapter">) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        minHeight: 100,
        p: 2,
        borderRadius: 1.5,
      }}
    >
      {chapter.description}
    </Box>
  );
}

type StudentChapterInfoSectionProps = {
  chapter: FetchStudentChapterSuccessRes["data"];
  isLocked: boolean;
};
export function StudentChapterInfoSection({
  chapter,
}: StudentChapterInfoSectionProps) {
  const isPurchased = !!chapter.course.purchases;
  return (
    <Stack sx={{ gap: 2 }}>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ gap: 2 }}
      >
        <Typography component={"h1"} variant="h3">
          {chapter.title}
        </Typography>
        <Box>
          {isPurchased && (
            <ProgressButton
              isCompleted={!!chapter.progresses?.isCompleted}
              chapter={chapter}
            />
          )}
          {!isPurchased && <EnrollButton chapter={chapter} />}
        </Box>
      </Stack>
      <Description chapter={chapter} />
    </Stack>
  );
}
