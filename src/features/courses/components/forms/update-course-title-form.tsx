"use client";
import React from "react";
import { EditOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  UpdateCourseTitleSchema,
  updateCourseTitleSchema,
} from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";
import { useUpdateCourse } from "../../hooks/use-update-course";
import { RequiredSuperscript } from "@/components/required-superscript";

type UpdateTitleFormProps = {
  defaultTitle: FetchCourseSuccessRes["data"]["title"];
  courseId: FetchCourseSuccessRes["data"]["id"];
};

export function UpdateCourseTitleForm({
  defaultTitle,
  courseId,
}: UpdateTitleFormProps) {
  const updateCourseTitleForm = useForm<UpdateCourseTitleSchema>({
    defaultValues: {
      title: defaultTitle,
      courseId,
    },
    resolver: zodResolver(updateCourseTitleSchema),
  });
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const { mutateAsync: updateCourse, isPending: isUpdating } = useUpdateCourse({
    onSuccess: (data) => {
      showSnackbar({ message: data.message, severity: "success" });
      router.refresh();
      updateCourseTitleForm.reset({ title: data.data.title });
    },
    onError: (error) => {
      showSnackbar({ message: error.message, severity: "error" });
      updateCourseTitleForm.reset();
    },
  });

  const onSubmit = async (values: UpdateCourseTitleSchema) => {
    await updateCourse({
      dataToUpdate: { title: values.title },
      courseId: values.courseId,
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
          Course title
          <RequiredSuperscript />
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
            onSubmit={updateCourseTitleForm.handleSubmit(onSubmit)}
            sx={{ gap: "2" }}
          >
            <Controller
              name="title"
              control={updateCourseTitleForm.control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  error={!!updateCourseTitleForm.formState.errors.title}
                  fullWidth
                  disabled={isUpdating}
                  helperText={
                    updateCourseTitleForm.formState.errors.title?.message
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
                updateCourseTitleForm.watch("title") === defaultTitle ||
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
