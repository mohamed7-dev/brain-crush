"use client";
import React from "react";
import { FetchChapterSuccessRes } from "../../api/fetch-chapter.api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";
import { useUpdateChapter } from "../../hooks/use-update-chapter";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { EditOutlined } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import {
  updateChapterDescriptionSchema,
  UpdateChapterDescriptionSchema,
} from "../../lib/schema";
import { RequiredSuperscript } from "@/components/required-superscript";

type UpdateChapterDescriptionFormProps = {
  defaultDescription: FetchChapterSuccessRes["data"]["description"];
  courseId: FetchChapterSuccessRes["data"]["courseId"];
  chapterId: FetchChapterSuccessRes["data"]["id"];
};
export function UpdateChapterDescriptionForm({
  defaultDescription,
  chapterId,
  courseId,
}: UpdateChapterDescriptionFormProps) {
  const updateChapterDescriptionForm = useForm<UpdateChapterDescriptionSchema>({
    defaultValues: {
      description: defaultDescription || "",
      id: chapterId,
    },
    resolver: zodResolver(updateChapterDescriptionSchema),
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const { mutateAsync: updateChapter, isPending: isUpdating } =
    useUpdateChapter({
      onSuccess: (data) => {
        showSnackbar({ message: data.message, severity: "success" });
        router.refresh();
        updateChapterDescriptionForm.reset({
          description: data.data.description!,
        });
      },
      onError: (error) => {
        showSnackbar({ message: error.message, severity: "error" });
        updateChapterDescriptionForm.reset();
      },
    });

  const onSubmit = async (values: UpdateChapterDescriptionSchema) => {
    await updateChapter({
      data: { description: values.description },
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
          Chapter description
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
            {defaultDescription || "No description"}
          </Typography>
        )}
        {isEditing && (
          <Stack
            component="form"
            autoComplete="off"
            onSubmit={updateChapterDescriptionForm.handleSubmit(onSubmit)}
            sx={{ gap: "2" }}
          >
            <Controller
              name="description"
              control={updateChapterDescriptionForm.control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  multiline
                  error={
                    !!updateChapterDescriptionForm.formState.errors.description
                  }
                  fullWidth
                  disabled={isUpdating}
                  helperText={
                    updateChapterDescriptionForm.formState.errors.description
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
                updateChapterDescriptionForm.watch("description") ===
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
