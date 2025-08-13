"use client";
import React from "react";
import { FetchStudentChapterSuccessRes } from "../../api/fetch-student-chapter.api";
import Stack, { StackProps } from "@mui/material/Stack";
import { Box, CircularProgress, styled } from "@mui/material";
import { NoDataPlaceholder } from "@/components/no-data-placeholder";
import { LockOutlined } from "@mui/icons-material";
import { CldVideoPlayer } from "next-cloudinary";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import "next-cloudinary/dist/cld-video-player.css";
import module from "./cld.module.css";

const StyledContainer = styled(Stack)<StackProps>(({ theme }) =>
  theme.unstable_sx({
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
  })
);

type StudentChapterVideoSectionProps = {
  chapter: FetchStudentChapterSuccessRes["data"];
  isLocked: boolean;
  completeOnEnd: boolean;
};
export function StudentChapterVideoSection({
  chapter,
  isLocked,
  completeOnEnd,
}: StudentChapterVideoSectionProps) {
  const [isReady, setIsReady] = React.useState(false);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const handleEnding = async () => {
    if (completeOnEnd) {
      // TODO: create progress

      if (!chapter.nextChapter) {
        // TODO: show confetti
      }
      showSnackbar({ message: "Progress updated.", severity: "success" });
      router.refresh();

      if (chapter.nextChapter) {
        router.push(
          routes.courseChapter(chapter.nextChapter.id, chapter.courseId)
        );
      }
    }
  };

  return (
    <Stack
      sx={{
        position: "relative",
        aspectRatio: "16:9",
        height: 500,
        bgcolor: "background.paper",
        borderRadius: 1.5,
      }}
    >
      {!isLocked && !isReady && (
        <StyledContainer direction={"row"}>
          <CircularProgress size={20} />
        </StyledContainer>
      )}
      {isLocked && (
        <StyledContainer direction={"row"}>
          <NoDataPlaceholder
            Icon={LockOutlined}
            Content={null}
            message="This chapter is locked"
          />
        </StyledContainer>
      )}
      {!isLocked && (
        <StyledContainer
          sx={{ display: !isReady ? "none" : "block", overflow: "hidden" }}
        >
          <CldVideoPlayer
            src={chapter.video?.video?.publicId!}
            onDataLoad={() => setIsReady(true)}
            onEnded={handleEnding}
            autoPlay
            className={module.container}
          />
        </StyledContainer>
      )}
    </Stack>
  );
}
