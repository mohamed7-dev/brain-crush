"use client";
import { FileUploader } from "@/components/file-uploader";
import {
  EditOutlined,
  ImageOutlined,
  AddAPhotoOutlined,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { UpdateCourseCoverSchema } from "../../lib/schema";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useUpdateCourse } from "../../hooks/use-update-course";

type UpdateCourseCoverProps = {
  defaultImageUrl: FetchCourseSuccessRes["data"]["imageUrl"];
  courseId: string;
};
export function UpdateCourseCoverImage({
  courseId,
  defaultImageUrl,
}: UpdateCourseCoverProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const { showSnackbar } = useSnackbar();

  const { mutateAsync: updateCourse } = useUpdateCourse({
    onSuccess: (data) => {
      showSnackbar({ message: data.message, severity: "success" });
      router.refresh();
      toggleEdit();
    },
    onError: (error) => {
      showSnackbar({ message: error.message, severity: "error" });
    },
  });

  const onSubmit = async (values: Partial<UpdateCourseCoverSchema>) => {
    await updateCourse({
      dataToUpdate: { imageUrl: values.coverImageUrl },
      courseId,
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
          Course cover
        </Typography>
        <Button
          variant="outlined"
          startIcon={
            isEditing ? undefined : !defaultImageUrl ? (
              <AddAPhotoOutlined />
            ) : (
              <EditOutlined />
            )
          }
          onClick={toggleEdit}
        >
          {isEditing && "Cancel"}
          {!isEditing && !defaultImageUrl && "Add cover"}
          {!isEditing && defaultImageUrl && "Edit cover"}
        </Button>
      </Stack>
      {!isEditing &&
        (!defaultImageUrl ? (
          <Stack
            sx={{
              rounded: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              gap: 1,
            }}
          >
            <ImageOutlined sx={{ height: 40, width: 40 }} />
            <Typography component={"p"} variant="body1">
              No Image Uploaded, yet!
            </Typography>
          </Stack>
        ) : (
          <Box sx={{ position: "relative", aspectRatio: "16/9", mt: 2 }}>
            <Image
              src={defaultImageUrl}
              alt="course cover image"
              fill
              style={{
                objectFit: "cover",
                borderRadius: "inherit",
              }}
            />
          </Box>
        ))}

      {isEditing && (
        <Stack sx={{ gap: 2 }}>
          <FileUploader
            endpoint="courseCoverImage"
            onChange={async (url) => {
              await onSubmit({ coverImageUrl: url });
            }}
            onUploadError={(message) => console.log(message)}
          />
          <Typography variant="subtitle2">
            16:9 aspect ratio is recommended to be used
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
