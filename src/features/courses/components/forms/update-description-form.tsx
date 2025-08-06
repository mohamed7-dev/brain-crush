"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateCourseDescriptionSchema,
  UpdateCourseDescriptionSchema,
} from "../../lib/schema";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { EditOutlined } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";
import { useUpdateCourse } from "../../hooks/use-update-course";

type UpdateDescriptionFormProps = {
  defaultDescription: FetchCourseSuccessRes["data"]["description"];
  courseId: FetchCourseSuccessRes["data"]["id"];
};

export function UpdateDescriptionForm({
  defaultDescription,
  courseId,
}: UpdateDescriptionFormProps) {
  const updateCourseDescriptionForm = useForm<UpdateCourseDescriptionSchema>({
    defaultValues: {
      description: defaultDescription || "",
      courseId,
    },
    resolver: zodResolver(updateCourseDescriptionSchema),
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const { mutateAsync: updateCourse, isPending: isUpdating } = useUpdateCourse({
    onSuccess: (data) => {
      showSnackbar({ message: data.message, severity: "success" });
      router.refresh();
      updateCourseDescriptionForm.reset({ description: data.data.description });
    },
    onError: (error) => {
      showSnackbar({ message: error.message, severity: "error" });
      updateCourseDescriptionForm.reset();
    },
  });

  const onSubmit = async (values: UpdateCourseDescriptionSchema) => {
    await updateCourse({
      dataToUpdate: { description: values.description },
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
          Course description
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
            {defaultDescription || "No description"}
          </Typography>
        )}
        {isEditing && (
          <Stack
            component="form"
            autoComplete="off"
            onSubmit={updateCourseDescriptionForm.handleSubmit(onSubmit)}
            sx={{ gap: "2" }}
          >
            <Controller
              name="description"
              control={updateCourseDescriptionForm.control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  multiline
                  error={
                    !!updateCourseDescriptionForm.formState.errors.description
                  }
                  fullWidth
                  disabled={isUpdating}
                  helperText={
                    updateCourseDescriptionForm.formState.errors.description
                      ?.message
                  }
                  placeholder="e.g.This course teaches..."
                  sx={{
                    [`& .${outlinedInputClasses.root}`]: { height: "auto" },
                  }}
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
                updateCourseDescriptionForm.watch("description") ===
                  (defaultDescription || "") || isUpdating
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
