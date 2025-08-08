import React from "react";
import { FetchChapterSuccessRes } from "../../api/fetch-chapter.api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type ChapterPagePageHeaderProps = {
  chapter: FetchChapterSuccessRes["data"];
};
export function ChapterPageHeaderSection({
  chapter,
}: ChapterPagePageHeaderProps) {
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <Stack
      direction={"row"}
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Box>
        <Typography component={"h1"} variant="h1">
          Course Chapter setup
        </Typography>
        <Typography component={"p"} variant="subtitle1">
          Complete all fields {completionText}
        </Typography>
      </Box>
      <Box>publish</Box>
    </Stack>
  );
}
