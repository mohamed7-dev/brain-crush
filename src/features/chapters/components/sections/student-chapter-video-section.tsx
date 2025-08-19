"use client";
import React from "react";
import { FetchStudentChapterSuccessRes } from "../../api/fetch-student-chapter.api";
import Stack, { StackProps } from "@mui/material/Stack";
import { Box, CircularProgress, styled } from "@mui/material";
import { NoDataPlaceholder } from "@/components/no-data-placeholder";
import { LockOutlined } from "@mui/icons-material";
import { useProgressChapter } from "../../hooks/use-progress-chapter";
import { OptimizedVideo } from "@/components/optimized-video";
import { useUser } from "@clerk/nextjs";

const StyledContainer = styled(Stack)<StackProps>(({ theme }) =>
  theme.unstable_sx({
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 500,
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
  const { user } = useUser();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = React.useState(false);
  const { mutateAsync: progressChapter } = useProgressChapter(chapter, {});

  const handleEnding = React.useCallback(async () => {
    if (completeOnEnd && user?.id) {
      await progressChapter({
        chapterId: chapter.id,
        courseId: chapter.courseId,
        isCompleted: true,
      });
    }
  }, [chapter, completeOnEnd, progressChapter, user]);
  React.useEffect(() => {
    const videoAPI = videoRef.current;
    videoAPI?.addEventListener("ended", handleEnding);
    return () => videoAPI?.removeEventListener("ended", handleEnding);
  }, [handleEnding]);

  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor: "background.paper",
        borderRadius: 1.5,
        alignItems: "center",
        justifyContent: "center",
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
        <Box
          sx={{
            display: !isReady ? "none" : "flex",
            overflow: "hidden",
            width: chapter.video?.video?.width ?? "100%",
            aspectRatio: "16:9",
          }}
        >
          {chapter.video?.video?.publicId && (
            <OptimizedVideo
              videoRef={videoRef}
              src={chapter.video.video.publicId}
              onDataLoad={() => setIsReady(true)}
              autoPlay
            />
          )}
        </Box>
      )}
    </Stack>
  );
}
