"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AlertDialog } from "@/components/alert-dialog";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";
import { useUpdateCourse } from "../../hooks/use-update-course";
import { useDeleteCourse } from "../../hooks/use-delete-course";
import { routes } from "@/lib/routes";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type TeacherCoursePageHeaderProps = {
  course: FetchCourseSuccessRes["data"];
};

export function TeacherCoursePageHeader({
  course,
}: TeacherCoursePageHeaderProps) {
  const requiredFields = [
    course.title,
    course.description,
    course.cover,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const { mutateAsync: updateCourse, isPending: isUpdating } = useUpdateCourse({
    onSuccess: (data) => {
      showSnackbar({ message: data.message, severity: "success" });
      router.refresh();
    },
    onError: (error) => {
      showSnackbar({ message: error.message, severity: "error" });
    },
  });
  const handlePublishing = async () => {
    if (course.isPublished) {
      await updateCourse({
        dataToUpdate: { isPublished: false },
        courseId: course.id,
      });
    } else {
      await updateCourse({
        dataToUpdate: { isPublished: true },
        courseId: course.id,
      });
    }
  };
  const { mutateAsync: deleteCourse, isPending: isDeleting } = useDeleteCourse({
    onSuccess: (data) => {
      showSnackbar({ message: data.message, severity: "success" });
      router.push(routes.teacherCourses);
    },
    onError: (error) => {
      showSnackbar({ message: error.message, severity: "error" });
    },
  });

  const handleDeletion = async () => {
    await deleteCourse({
      courseId: course.id,
    });
  };

  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography component={"h1"} variant="h1">
          Course setup
        </Typography>
        <Typography component={"p"} variant="subtitle1">
          Complete all fields {completionText}
        </Typography>
      </Box>
      <Stack direction={"row"} sx={{ alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          loading={isUpdating}
          loadingPosition="start"
          onClick={handlePublishing}
          disabled={!isComplete || isUpdating}
        >
          {!isUpdating
            ? course.isPublished
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
