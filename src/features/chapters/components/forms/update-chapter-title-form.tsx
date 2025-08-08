"use client";
import React from "react";
import { FetchChapterSuccessRes } from "../../api/fetch-chapter.api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateChapterTitleSchema,
  UpdateChapterTitleSchema,
} from "../../lib/schema";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { EditOutlined } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { useUpdateChapter } from "../../hooks/use-update-chapter";

type UpdateChapterTitleFormProps = {
  defaultTitle: FetchChapterSuccessRes["data"]["title"];
  chapterId: FetchChapterSuccessRes["data"]["id"];
  courseId: FetchChapterSuccessRes["data"]["courseId"];
};
export function UpdateChapterTitleForm({
  chapterId,
  defaultTitle,
  courseId,
}: UpdateChapterTitleFormProps) {
  const updateChapterTitleForm = useForm<UpdateChapterTitleSchema>({
    defaultValues: {
      title: defaultTitle,
      id: chapterId,
    },
    resolver: zodResolver(updateChapterTitleSchema),
  });
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const { mutateAsync: updateChapter, isPending: isUpdating } =
    useUpdateChapter({
      onSuccess: (data) => {
        showSnackbar({ message: data.message, severity: "success" });
        router.refresh();
        updateChapterTitleForm.reset({ title: data.data.title });
      },
      onError: (error) => {
        showSnackbar({ message: error.message, severity: "error" });
        updateChapterTitleForm.reset();
      },
    });

  const onSubmit = async (values: UpdateChapterTitleSchema) => {
    await updateChapter({
      data: { title: values.title },
      courseId,
      id: values.id,
    });
  };
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 1.5,
      }}
    >
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography component={"p"} variant="subtitle2">
          Chapter title
        </Typography>
        <Button
          variant="outlined"
          startIcon={isEditing ? undefined : <EditOutlined />}
          onClick={toggleEdit}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </Stack>
      <Stack sx={{ gap: 2 }}>
        {!isEditing && (
          <Typography component={"p"} variant="body2">
            {defaultTitle}
          </Typography>
        )}
        {isEditing && (
          <Stack
            component="form"
            autoComplete="off"
            onSubmit={updateChapterTitleForm.handleSubmit(onSubmit)}
            sx={{ gap: "2" }}
          >
            <Controller
              name="title"
              control={updateChapterTitleForm.control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  error={!!updateChapterTitleForm.formState.errors.title}
                  fullWidth
                  disabled={isUpdating}
                  helperText={
                    updateChapterTitleForm.formState.errors.title?.message
                  }
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
              variant={"outlined"}
              color={"secondary"}
              loading={isUpdating}
              loadingPosition="start"
              disabled={
                updateChapterTitleForm.watch("title") === defaultTitle ||
                isUpdating
              }
            >
              Save
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
