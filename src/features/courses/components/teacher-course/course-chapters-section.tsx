"use client";
import React from "react";
import { VideoCallOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";
import { CourseChaptersList } from "./course-chapters-list";
import { routes } from "@/lib/routes";
import {
  CreateChapterErrorRes,
  CreateChapterSuccessRes,
} from "@/features/chapters/api/create-chapter.api";
import { useReorderChapter } from "@/features/chapters/hooks/use-reorder-chapter";
import { CreateChapterForm } from "@/features/chapters/components/create-chapter-form";
import { RequiredSuperscript } from "@/components/required-superscript";

type ChaptersSectionProps = {
  defaultChapters: FetchCourseSuccessRes["data"]["chapters"];
  courseId: FetchCourseSuccessRes["data"]["id"];
};
type Mode = "Creation" | "Editing" | null;
export function CourseChaptersSection({
  courseId,
  defaultChapters,
}: ChaptersSectionProps) {
  const [formMode, setFormMode] = React.useState<Mode>(null);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const toggleEdit = (mode: Mode) => {
    setFormMode(mode);
  };

  const onCreatingChapterSuccess = (data?: CreateChapterSuccessRes) => {
    if (data) {
      showSnackbar({ message: data.message, severity: "success" });
    }
    router.refresh();
    toggleEdit(null);
  };

  const onCreatingChapterError = (error?: CreateChapterErrorRes) => {
    if (error) {
      showSnackbar({ message: error.message, severity: "error" });
    }
  };

  const { mutateAsync: reorderChapter, isPending: isReordering } =
    useReorderChapter({
      onMutate: () => setFormMode("Editing"),
      onSettled: () => setFormMode(null),
      onSuccess: (data) => {
        showSnackbar({ message: data.message, severity: "success" });
        router.refresh();
      },
      onError: (error) => {
        showSnackbar({ message: error.message, severity: "error" });
      },
    });
  const handleReordering = async (info: { id: string; position: number }[]) => {
    await reorderChapter({ courseId, reorderData: info });
  };

  const handleEditing = (id: string) => {
    router.push(routes.teacherCourseChapter(courseId, id));
  };
  return (
    <Stack
      sx={{
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 1.5,
        gap: 2,
      }}
    >
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography component={"p"} variant="subtitle2">
          Course chapters
          <RequiredSuperscript>*(Publish one chapter)</RequiredSuperscript>
        </Typography>
        <Button
          variant="outlined"
          startIcon={
            formMode === "Creation" ? undefined : <VideoCallOutlined />
          }
          onClick={() =>
            toggleEdit(formMode === "Creation" ? null : "Creation")
          }
          disabled={isReordering}
        >
          {formMode === "Creation" ? "Cancel" : "Add chapter"}
        </Button>
      </Stack>

      <Stack sx={{ gap: 2 }}>
        {formMode === "Creation" && (
          <CreateChapterForm
            courseId={courseId}
            onSuccess={onCreatingChapterSuccess}
            onError={onCreatingChapterError}
          />
        )}
        {formMode !== "Creation" && !!!defaultChapters?.length && (
          <Typography component={"p"} variant="body1">
            No Chapters Added Yet
          </Typography>
        )}
        {formMode !== "Creation" && !!defaultChapters?.length && (
          <Stack sx={{ gap: 4 }}>
            <CourseChaptersList
              onEdit={handleEditing}
              onReorder={handleReordering}
              defaultChapters={defaultChapters || []}
              isReorderingActive={isReordering}
            />
            <Typography component={"p"} variant="caption">
              Drag and drop to reorder the chapters
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
