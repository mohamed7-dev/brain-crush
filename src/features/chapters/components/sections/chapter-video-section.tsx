"use client";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FetchChapterSuccessRes } from "../../api/fetch-chapter.api";
import {
  EditOutlined,
  VideoCallOutlined,
  VideoFileOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useUpdateChapterVideo } from "../../hooks/use-update-chapter-video";
import {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { UploadWidget } from "@/components/upload-widget";
import { RequiredSuperscript } from "@/components/required-superscript";
import { OptimizedVideo } from "@/components/optimized-video";

type ChapterVideoSectionProps = {
  chapterId: FetchChapterSuccessRes["data"]["id"];
  courseId: FetchChapterSuccessRes["data"]["courseId"];
  video: FetchChapterSuccessRes["data"]["video"];
};
export function ChapterVideoSection({
  video,
  chapterId,
  courseId,
}: ChapterVideoSectionProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const { showSnackbar } = useSnackbar();

  const { mutateAsync: updateChapterVideo } = useUpdateChapterVideo({
    onSuccess: (data) => {
      showSnackbar({ message: data.message, severity: "success" });
      router.refresh();
      toggleEdit();
    },
    onError: (error) => {
      console.log(error);
      showSnackbar({ message: error.message, severity: "error" });
    },
  });

  const onUploadingSuccess = async (file: CloudinaryUploadWidgetResults) => {
    const resource = file.info as CloudinaryUploadWidgetInfo;
    await updateChapterVideo({
      asset: {
        name: resource.original_filename,
        publicId: resource.public_id,
        bytes: resource.bytes,
        duration: (resource?.duration as number).toString() ?? undefined,
        type: resource.type,
        assetType: "Video",
        width: resource.width,
        height: resource.height,
        secureURL: resource.secure_url,
        version: resource.version.toString(),
        format: resource.format,
      },
      id: chapterId,
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
          Chapter video
          <RequiredSuperscript />
        </Typography>
        <Button
          variant="outlined"
          startIcon={
            isEditing ? undefined : !video ? (
              <VideoCallOutlined />
            ) : (
              <EditOutlined />
            )
          }
          onClick={toggleEdit}
        >
          {isEditing && "Cancel"}
          {!isEditing && !video && "Add video"}
          {!isEditing && video && "Edit video"}
        </Button>
      </Stack>
      {!isEditing && !video && (
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
          <VideoFileOutlined sx={{ height: 40, width: 40 }} />
          <Typography component={"p"} variant="body1">
            No Video Uploaded, yet!
          </Typography>
        </Stack>
      )}
      {!isEditing && video && (
        <Box sx={{ mt: 2 }}>
          <OptimizedVideo
            src={video.publicId}
            width={video.width!}
            height={400}
          />
        </Box>
      )}

      {isEditing && (
        <Stack sx={{ gap: 2 }}>
          <UploadWidget
            widgetProps={{
              options: {
                sources: ["local"],
                multiple: false,
                maxFiles: 1,
                resourceType: "video",
                clientAllowedFormats: ["mp4", "mkv"],
              },
              onSuccess: (result) => onUploadingSuccess(result),
            }}
          />
          <Typography variant="subtitle2">
            Upload this chapter&apos;s video
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
