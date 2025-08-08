"use client";
import { EditOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { FetchChapterSuccessRes } from "../../api/fetch-chapter.api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateChapterAccessSchema,
  UpdateChapterAccessSchema,
} from "../../lib/schema";
import { useUpdateChapter } from "../../hooks/use-update-chapter";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

type UpdateChapterAccessFormProps = {
  defaultIsFree: FetchChapterSuccessRes["data"]["isFree"];
  chapterId: FetchChapterSuccessRes["data"]["id"];
  courseId: FetchChapterSuccessRes["data"]["courseId"];
};
export function UpdateChapterAccessForm({
  defaultIsFree,
  chapterId,
  courseId,
}: UpdateChapterAccessFormProps) {
  const updateChapterAccessForm = useForm<UpdateChapterAccessSchema>({
    defaultValues: {
      isFree: defaultIsFree,
      id: chapterId,
    },
    resolver: zodResolver(updateChapterAccessSchema),
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
        updateChapterAccessForm.reset({ isFree: data.data.isFree });
      },
      onError: (error) => {
        showSnackbar({ message: error.message, severity: "error" });
        updateChapterAccessForm.reset();
      },
    });

  const onSubmit = async (values: UpdateChapterAccessSchema) => {
    await updateChapter({
      data: { isFree: values.isFree },
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
          Chapter access
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
        {!isEditing && defaultIsFree && (
          <Typography component={"p"} variant="body2">
            This chapter is available for free.
          </Typography>
        )}
        {!isEditing && !defaultIsFree && (
          <Typography component={"p"} variant="body2">
            This chapter is not available for free.
          </Typography>
        )}
        {isEditing && (
          <Stack
            component="form"
            autoComplete="off"
            onSubmit={updateChapterAccessForm.handleSubmit(onSubmit)}
            sx={{ gap: "2" }}
          >
            <Controller
              name="isFree"
              control={updateChapterAccessForm.control}
              render={({ field }) => (
                <FormControlLabel
                  required
                  control={
                    <Switch checked={field.value} onChange={field.onChange} />
                  }
                  label="Is free chapter?"
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
                updateChapterAccessForm.watch("isFree") === defaultIsFree ||
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
