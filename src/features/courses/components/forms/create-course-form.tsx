"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { createCourseSchema, CreateCourseSchema } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { routes } from "@/lib/routes";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { createCourse } from "../../api/create-course.api";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";

export function CreateCourseForm() {
  const createCourseForm = useForm<CreateCourseSchema>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(createCourseSchema),
  });
  const [isPending, setIsPending] = React.useState(false);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const onSubmit = async (values: CreateCourseSchema) => {
    setIsPending(true);
    const res = await createCourse(values).finally(() => setIsPending(false));
    if ("error" in res) {
      showSnackbar({ message: res.message, severity: "error" });
      return;
    }
    showSnackbar({ message: res.message, severity: "success" });
    createCourseForm.reset();
    router.push(routes.teacherCourse(res.data.id));
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
          <FormControl
            variant="outlined"
            margin="normal"
            error={!!createCourseForm.formState.errors.title}
            disabled={isPending}
            fullWidth
          >
            <OutlinedInput
              placeholder="e.g.'The complete reference to SQL/Postgres'"
              disabled={isPending}
              {...field}
            />
            <FormHelperText>
              {createCourseForm.formState.errors.title?.message ||
                "What are you teaching in this course?"}
            </FormHelperText>
          </FormControl>
        )}
      />
      <Stack direction={"row"} sx={{ alignItems: "center", gap: "4px" }}>
        <Button
          type="button"
          href={routes.home}
          variant="outlined"
          color={"secondary"}
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
