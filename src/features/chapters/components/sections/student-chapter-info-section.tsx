"use client";
import React from "react";
import { FetchStudentChapterSuccessRes } from "../../api/fetch-student-chapter.api";
import { Box, Button, Stack, Typography } from "@mui/material";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { formatPrice } from "@/lib/utils";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.bubble.css";
import { useEnrollUser } from "@/features/courses/hooks/use-enroll-user";

type ProgressButtonProps = {
  isCompleted: boolean;
  chapter: StudentChapterInfoSectionProps["chapter"];
};
function ProgressButton({ isCompleted, chapter }: ProgressButtonProps) {
  const Icon = isCompleted ? CloseOutlined : CheckOutlined;
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const handleProgress = () => {
    // TODO: create progress action
    if (!chapter.nextChapter) {
      // TODO: open confetti
    }
    if (chapter.nextChapter) {
      router.push(
        routes.courseChapter(chapter.nextChapter.id, chapter.courseId)
      );
    }
    showSnackbar({ message: "Progress updated.", severity: "success" });
    router.refresh();
  };
  return (
    <Button
      onClick={handleProgress}
      variant="outlined"
      color={isCompleted ? "success" : "secondary"}
      disabled={false}
    >
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon />
    </Button>
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
  return (
    <Button onClick={handleEnrolling} variant="contained" disabled={false}>
      Enroll for {formatPrice(chapter.course.price!)}
    </Button>
  );
}

function Description({
  chapter,
}: Pick<StudentChapterInfoSectionProps, "chapter">) {
  const ReactQuill = React.useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  // return <ReactQuill theme="bubble" value={chapter.description!} readOnly />;
  return null;
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
      <Description chapter={chapter} />
    </Stack>
  );
}
