"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { createCourseSchema, CreateCourseSchema } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { routes } from "@/lib/routes";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";
import { useCreateCourse } from "../../hooks/use-create-course";
import TextField from "@mui/material/TextField";

export function CreateCourseForm() {
  const createCourseForm = useForm<CreateCourseSchema>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(createCourseSchema),
  });
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const { mutateAsync: createCourse, isPending } = useCreateCourse({
    onSuccess: (data) => {
      showSnackbar({ message: data.message, severity: "success" });
      createCourseForm.reset();
      router.push(routes.teacherCourse(data.data.id));
    },
    onError: (error) => {
      showSnackbar({ message: error.message, severity: "error" });
    },
  });

  const onSubmit = async (values: CreateCourseSchema) => {
    await createCourse(values);
  };
  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={createCourseForm.handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <Controller
        name="title"
        control={createCourseForm.control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            margin="normal"
            error={!!createCourseForm.formState.errors.title}
            fullWidth
            disabled={isPending}
            helperText={
              createCourseForm.formState.errors.title?.message ??
              "What are you teaching in this course?"
            }
            placeholder="e.g.'The complete reference to SQL/Postgres'"
            {...field}
          />
        )}
      />
      <Stack direction={"row"} sx={{ alignItems: "center", gap: 2 }}>
        <Button
          type="button"
          href={routes.home}
          variant="outlined"
          color={"secondary"}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant={isPending ? "outlined" : "contained"}
          color={"primary"}
          loading={isPending}
          loadingPosition="start"
          disabled={isPending}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
}
