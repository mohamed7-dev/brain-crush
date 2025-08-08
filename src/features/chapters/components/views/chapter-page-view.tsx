import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { FetchChapterSuccessRes } from "../../api/fetch-chapter.api";
import { NavigationBar } from "@/components/navigation-bar";
import { routes } from "@/lib/routes";
import { ChapterPageHeaderSection } from "../sections/chapter-page-header-section";
import Grid from "@mui/material/Grid";
import { BadgeBar } from "@/components/badge-bar";
import {
  DashboardOutlined,
  VideoLibraryOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { UpdateChapterTitleForm } from "../forms/update-chapter-title-form";
import { UpdateChapterDescriptionForm } from "../forms/update-chapter-description-form";
import { UpdateChapterAccessForm } from "../forms/update-chapter-access-form";

type ChapterPageViewProps = {
  chapter: FetchChapterSuccessRes["data"];
};
export function ChapterPageView({ chapter }: ChapterPageViewProps) {
  return (
    <Stack sx={{ gap: 4, p: 4 }}>
      {!chapter.isPublished && (
        <Alert severity="warning" sx={{ width: "100%" }}>
          This chapter is not published. It will not be visible in the course
        </Alert>
      )}
      <Stack sx={{ gap: 2 }}>
        <NavigationBar
          sx={{ alignSelf: "start" }}
          href={routes.teacherCourse(chapter.courseId)}
        >
          Back to course setup
        </NavigationBar>
        <ChapterPageHeaderSection chapter={chapter} />
      </Stack>
      <Grid container columns={13} columnGap={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack sx={{ gap: 2, mb: 4 }}>
            <BadgeBar
              icon={DashboardOutlined}
              label="Customize your course chapter"
            />
            <UpdateChapterTitleForm
              defaultTitle={chapter.title}
              courseId={chapter.courseId}
              chapterId={chapter.id}
            />
            <UpdateChapterDescriptionForm
              defaultDescription={chapter.description}
              courseId={chapter.courseId}
              chapterId={chapter.id}
            />
          </Stack>
          <Stack sx={{ gap: 2 }}>
            <BadgeBar icon={VisibilityOutlined} label="Access settings" />
            <UpdateChapterAccessForm
              defaultIsFree={chapter.isFree}
              courseId={chapter.courseId}
              chapterId={chapter.id}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BadgeBar icon={VideoLibraryOutlined} label="Add a video" />
          <>video upload section</>
        </Grid>
      </Grid>
    </Stack>
  );
}
