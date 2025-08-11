"use client";
import { EditOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import { formatPrice } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateCoursePriceSchema,
  UpdateCoursePriceSchema,
} from "../../lib/schema";
import TextField from "@mui/material/TextField";
import { useUpdateCourse } from "../../hooks/use-update-course";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";
import { RequiredSuperscript } from "@/components/required-superscript";

type CoursePriceFormProps = {
  defaultPrice: FetchCourseSuccessRes["data"]["price"];
  courseId: FetchCourseSuccessRes["data"]["id"];
};

export function CoursePriceForm({
  courseId,
  defaultPrice,
}: CoursePriceFormProps) {
  const updateCoursePriceForm = useForm<UpdateCoursePriceSchema>({
    defaultValues: {
      price: defaultPrice || 0,
      courseId,
    },
    resolver: zodResolver(updateCoursePriceSchema),
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const { mutateAsync: updateCourse, isPending: isUpdating } = useUpdateCourse({
    onSuccess: (data) => {
      showSnackbar({ message: data.message, severity: "success" });
      updateCoursePriceForm.reset({ price: data.data.price });
      router.refresh();
    },
    onError: (error) => {
      showSnackbar({ message: error.message, severity: "error" });
      updateCoursePriceForm.reset();
    },
  });

  const onSubmit = async (values: UpdateCoursePriceSchema) => {
    await updateCourse({
      dataToUpdate: { price: values.price },
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
          Course price
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
            {defaultPrice ? formatPrice(defaultPrice) : "No Price"}
          </Typography>
        )}
        {isEditing && (
          <Stack
            component="form"
            autoComplete="off"
            onSubmit={updateCoursePriceForm.handleSubmit(onSubmit)}
            sx={{ gap: "2" }}
          >
            <Controller
              name="price"
              control={updateCoursePriceForm.control}
              render={({ field: { onChange, ...field } }) => (
                <TextField
                  type="number"
                  variant="outlined"
                  margin="normal"
                  error={!!updateCoursePriceForm.formState.errors.price}
                  fullWidth
                  disabled={isUpdating}
                  helperText={
                    updateCoursePriceForm.formState.errors.price?.message
                  }
                  placeholder="Set a price for your course"
                  onChange={(e) =>
                    updateCoursePriceForm.setValue(
                      "price",
                      Number(e.target.value)
                    )
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
                updateCoursePriceForm.watch("price") === (defaultPrice || 0) ||
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
