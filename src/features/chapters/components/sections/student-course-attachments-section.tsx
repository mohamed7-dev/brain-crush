"use client";
import React from "react";
import { FetchStudentChapterSuccessRes } from "../../api/fetch-student-chapter.api";
import {
  alpha,
  Button,
  List,
  ListItem,
  ListItemButton,
  listItemButtonClasses,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FileDownloadOutlined } from "@mui/icons-material";
import { brand } from "@/lib/theme/primitives";

type StudentCourseAttachmentsSectionProps = {
  chapter: FetchStudentChapterSuccessRes["data"];
};
export function StudentCourseAttachmentsSection({
  chapter,
}: StudentCourseAttachmentsSectionProps) {
  const attachments = chapter.course.attachments ?? [];
  if (!attachments.length) return null;
  return (
    <Stack>
      <Typography component={"h2"} variant="h4">
        Attachments
      </Typography>
      <List sx={{ maxWidth: { sx: "full", md: 500 } }}>
        {attachments.map((attachment) => (
          <ListItem key={attachment.id}>
            <ListItemButton
              sx={(theme) => ({
                "&:hover": { textDecoration: "underline" },
              })}
              href={attachment.asset.secureURL}
            >
              <ListItemIcon>
                <FileDownloadOutlined />
              </ListItemIcon>
              <ListItemText> {attachment.asset.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
