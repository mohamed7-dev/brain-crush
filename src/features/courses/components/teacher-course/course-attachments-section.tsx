"use client";
import React from "react";
import {
  AttachFileOutlined,
  DeleteOutlined,
  FilePresentOutlined,
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import { CircularProgress, IconButton } from "@mui/material";
import { useCreateAttachment } from "../../hooks/use-create-attachment";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";
import { useDeleteAttachment } from "../../hooks/use-delete-attachment";
import {
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { UploadWidget } from "@/components/upload-widget";

type CourseAttachmentsSectionProps = {
  defaultAttachments: FetchCourseSuccessRes["data"]["attachments"];
  courseId: FetchCourseSuccessRes["data"]["id"];
};

export function CourseAttachmentsSection({
  defaultAttachments,
  courseId,
}: CourseAttachmentsSectionProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const { mutateAsync: createAttachment, isPending: isCreatingAttachment } =
    useCreateAttachment({
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
    await createAttachment({
      asset: {
        name: resource.original_filename,
        publicId: resource.public_id,
        bytes: resource.bytes,
        type: resource.type,
        assetType: "Binary",
        width: resource.width,
        height: resource.height,
        secureURL: resource.secure_url,
        version: resource.version.toString(),
      },
      courseId,
    });
  };

  const { mutateAsync: deleteAttachment, isPending: isDeletingAttachment } =
    useDeleteAttachment({
      onSuccess: (data) => {
        showSnackbar({ message: data.message, severity: "success" });
        router.refresh();
        toggleEdit();
      },
      onError: (error) => {
        showSnackbar({ message: error.message, severity: "error" });
      },
      onSettled: () => {
        setDeletingId(null);
      },
    });

  const handleDeletingAttachment = async (id: string) => {
    setDeletingId(id);
    await deleteAttachment({ id, courseId });
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
        flexWrap={"wrap"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography component={"p"} variant="subtitle2">
          Course attachments
        </Typography>
        <Button
          variant="outlined"
          startIcon={isEditing ? undefined : <AttachFileOutlined />}
          onClick={toggleEdit}
          disabled={isCreatingAttachment || isDeletingAttachment}
        >
          {isEditing ? "Cancel" : "Add attachment"}
        </Button>
      </Stack>
      {!isEditing && !!!defaultAttachments.length && (
        <Typography component={"p"} variant="body2">
          No Attachments Added Yet
        </Typography>
      )}
      {!isEditing && !!defaultAttachments.length && (
        <Stack sx={{ gap: 1 }}>
          {defaultAttachments?.map((attachment) => (
            <Stack
              key={attachment.id}
              direction={"row"}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Stack direction={"row"} sx={{ gap: 1, alignItems: "center" }}>
                <FilePresentOutlined />
                <Typography component={"p"} variant="body2">
                  {attachment.asset.name}
                </Typography>
              </Stack>
              {deletingId === attachment.id && (
                <CircularProgress size={20} color="inherit" />
              )}
              {deletingId !== attachment.id && (
                <IconButton
                  onClick={() => handleDeletingAttachment(attachment.id)}
                >
                  <DeleteOutlined />
                </IconButton>
              )}
            </Stack>
          ))}
        </Stack>
      )}

      {isEditing && (
        <Stack sx={{ gap: 2 }}>
          <UploadWidget
            widgetProps={{
              options: {
                sources: ["local"],
                multiple: false,
                maxFiles: 1,
                resourceType: "auto",
                clientAllowedFormats: [
                  "jpg",
                  "jpeg",
                  "png",
                  "mp4",
                  "mkv",
                  "mp3",
                  "pdf",
                  "txt",
                  "docx",
                  "pptx",
                ],
              },

              onSuccess: (result) => onUploadingSuccess(result),
            }}
          />
          <Typography variant="subtitle2">
            Add any file that helps your students to complete the course.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
