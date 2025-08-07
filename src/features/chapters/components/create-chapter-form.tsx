"use client";
import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { createChapterSchema, CreateChapterSchema } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateChapter } from "../hooks/use-create-chapter";
import { AsyncActionCallback } from "@/lib/type-utils";
import {
  CreateChapterErrorRes,
  CreateChapterSuccessRes,
} from "../api/create-chapter.api";

type CreateChapterFormProps = AsyncActionCallback<
  CreateChapterSuccessRes,
  CreateChapterErrorRes
> & { courseId: string };

export function CreateChapterForm({
  onError,
  onSettled,
  onSuccess,
  onMutate,
  courseId,
}: CreateChapterFormProps) {
  const createChapterForm = useForm<CreateChapterSchema>({
    defaultValues: {
      title: "",
      courseId,
    },
    resolver: zodResolver(createChapterSchema),
  });
  const { mutateAsync: createChapter, isPending } = useCreateChapter({
    onSuccess: (data) => onSuccess?.(data),
    onError: (error) => onError?.(error),
    onMutate: () => onMutate?.(),
    onSettled: () => onSettled?.(),
  });
  const onSubmit = async (values: CreateChapterSchema) => {
    await createChapter(values);
  };
  return (
    <Stack
      component="form"
      autoComplete="off"
      onSubmit={createChapterForm.handleSubmit(onSubmit)}
      sx={{ gap: "2" }}
    >
      <Controller
        name="title"
        control={createChapterForm.control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            margin="normal"
            multiline
            error={!!createChapterForm.formState.errors.title}
            fullWidth
            disabled={isPending}
            helperText={createChapterForm.formState.errors.title?.message}
            placeholder="e.g.Introduction to the course"
            {...field}
          />
        )}
      />
      <Button
        type="submit"
        variant={"outlined"}
        color={"secondary"}
        loading={isPending}
        loadingPosition="start"
        disabled={isPending || !createChapterForm.formState.isValid}
      >
        Create
      </Button>
    </Stack>
  );
}
