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

type UpdateTitleFormProps = {
  defaultTitle: FetchCourseSuccessRes["data"]["title"];
};

export function UpdateTitleForm({ defaultTitle }: UpdateTitleFormProps) {
  const updateCourseTitleForm = useForm<UpdateCourseTitleSchema>({
    defaultValues: {
      title: defaultTitle,
    },
    resolver: zodResolver(updateCourseTitleSchema),
  });
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: UpdateCourseTitleSchema) => {
    console.log(values);
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
                  disabled={false}
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
              loading={false}
              loadingPosition="start"
              disabled={updateCourseTitleForm.watch("title") === defaultTitle}
            >
              Save
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
