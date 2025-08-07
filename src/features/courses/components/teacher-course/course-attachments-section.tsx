"use client";
import React from "react";
import { FileUploader } from "@/components/file-uploader";
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
import { ClientUploadedFileData } from "uploadthing/types";

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

  const handleCreatingAttachment = async (
    file: ClientUploadedFileData<null>
  ) => {
    if (file) {
      await createAttachment({
        courseId,
        url: file.ufsUrl,
        name: file.name,
        size: file.size,
        type: file.type,
        key: file.key,
      });
    }
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
  const handleDeletingAttachment = async ({
    id,
    fileKey,
  }: {
    id: string;
    fileKey: string;
  }) => {
    setDeletingId(id);
    await deleteAttachment({ id, courseId, fileKey });
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
                  {attachment.name}
                </Typography>
              </Stack>
              {deletingId === attachment.id && (
                <CircularProgress size={20} color="inherit" />
              )}
              {deletingId !== attachment.id && (
                <IconButton
                  onClick={() =>
                    handleDeletingAttachment({
                      id: attachment.id,
                      fileKey: attachment.key,
                    })
                  }
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
          <FileUploader
            endpoint="courseAttachments"
            onChange={async (file) => {
              await handleCreatingAttachment(file);
            }}
            onUploadError={(message) => console.log(message)}
          />
          <Typography variant="subtitle2">
            Add any file that helps your students to complete the course.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
