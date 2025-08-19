"use client";
import React from "react";
import { FetchChapterSuccessRes } from "../../api/fetch-chapter.api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";
import { useDeleteChapter } from "../../hooks/use-delete-chapter";
import { routes } from "@/lib/routes";
import { AlertDialog } from "@/components/alert-dialog";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useUpdateChapter } from "../../hooks/use-update-chapter";

type ChapterPagePageHeaderProps = {
  chapter: FetchChapterSuccessRes["data"];
};
export function ChapterPageHeaderSection({
  chapter,
}: ChapterPagePageHeaderProps) {
  const requiredFields = [chapter.title, chapter.description, chapter.video];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const { mutateAsync: publishChapter, isPending } = useUpdateChapter({
    onSuccess: (data) => {
      showSnackbar({
        message: `Chapter has been ${
          data.data.isPublished ? "published" : "unpublished"
        } successfully.`,
        severity: "success",
      });
      router.refresh();
    },
    onError: (error) => {
      showSnackbar({ message: error.message, severity: "error" });
    },
  });
  const handlePublishing = async () => {
    if (chapter.isPublished) {
      await publishChapter({
        data: { isPublished: false },
        id: chapter.id,
        courseId: chapter.courseId,
      });
    } else {
      await publishChapter({
        data: { isPublished: true },
        id: chapter.id,
        courseId: chapter.courseId,
      });
    }
  };
  const { mutateAsync: deleteChapter, isPending: isDeleting } =
    useDeleteChapter({
      onSuccess: (data) => {
        showSnackbar({ message: data.message, severity: "success" });
        router.push(routes.teacherCourse(data.data.courseId));
      },
      onError: (error) => {
        showSnackbar({ message: error.message, severity: "error" });
      },
    });

  const handleDeletion = async () => {
    await deleteChapter({
      chapterId: chapter.id,
      courseId: chapter.courseId,
    });
  };
  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Box>
        <Typography component={"h1"} variant="h1">
          Course Chapter setup
        </Typography>
        <Typography component={"p"} variant="subtitle1">
          Complete all fields {completionText}
        </Typography>
      </Box>
      <Stack direction={"row"} sx={{ alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          loading={isPending}
          loadingPosition="start"
          onClick={handlePublishing}
          disabled={!isComplete || isPending}
        >
          {!isPending
            ? chapter.isPublished
              ? "Unpublish"
              : "Publish"
            : "Pending"}
        </Button>
        <AlertDialog
          onConfirm={handleDeletion}
          TriggerButton={
            <IconButton
              color="secondary"
              loading={isDeleting}
              disabled={isDeleting}
            >
              <DeleteOutlineOutlined />
            </IconButton>
          }
        />
      </Stack>
    </Stack>
  );
}
