"use client";
import React from "react";
import {
  EditOutlined,
  ImageOutlined,
  AddAPhotoOutlined,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { UploadWidget } from "@/components/upload-widget";
import {
  CldImage,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useUpdateCourseCover } from "../../hooks/use-update-course-cover";
import { RequiredSuperscript } from "@/components/required-superscript";

type CourseCoverImageSectionProps = {
  cover: FetchCourseSuccessRes["data"]["cover"];
  title: FetchCourseSuccessRes["data"]["title"];
  courseId: string;
};
export function CourseCoverImageSection({
  courseId,
  cover,
  title,
}: CourseCoverImageSectionProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const { showSnackbar } = useSnackbar();

  const { mutateAsync: updateCourseCover } = useUpdateCourseCover({
    onSuccess: (data) => {
      showSnackbar({ message: data.message, severity: "success" });
      router.refresh();
      toggleEdit();
    },
    onError: (error) => {
      showSnackbar({ message: error.message, severity: "error" });
    },
  });

  const onUploadingSuccess = async (file: CloudinaryUploadWidgetResults) => {
    const resource = file.info as CloudinaryUploadWidgetInfo;
    await updateCourseCover({
      coverImage: {
        name: resource.original_filename,
        publicId: resource.public_id,
        bytes: resource.bytes,
        type: resource.type,
        assetType: "Image",
        width: resource.width,
        height: resource.height,
        secureURL: resource.secure_url,
        version: resource.version.toString(),
        format: resource.format,
      },
      courseId,
    });
  };

  return (
    <Stack
      sx={{
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 1.5,
        gap: 2,
      }}
    >
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography component={"p"} variant="subtitle2">
          Course cover
          <RequiredSuperscript />
        </Typography>
        <Button
          variant="outlined"
          startIcon={
            isEditing ? undefined : !cover ? (
              <AddAPhotoOutlined />
            ) : (
              <EditOutlined />
            )
          }
          onClick={toggleEdit}
        >
          {isEditing && "Cancel"}
          {!isEditing && !cover && "Add cover"}
          {!isEditing && cover && "Edit cover"}
        </Button>
      </Stack>
      {!isEditing &&
        (!cover ? (
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
            <CldImage
              src={cover.publicId}
              alt={`cover image of the course ${title}`}
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
          <UploadWidget
            widgetProps={{
              options: {
                sources: ["local"],
                multiple: false,
                maxFiles: 1,
                resourceType: "image",
              },
              onSuccess: (result) => onUploadingSuccess(result),
            }}
          />
          <Typography variant="subtitle2">
            16:9 aspect ratio is recommended
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
