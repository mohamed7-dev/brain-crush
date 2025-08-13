import React from "react";
import { FetchCourseChaptersSuccessRes } from "@/features/courses/api/fetch-course-chapters.api";
import Stack from "@mui/material/Stack";
import { List, Typography } from "@mui/material";
import { SidebarItem } from "./sidebar-item";
import { CourseProgress } from "@/features/courses/components/course-progress";

type SidebarMenuContentProps = {
  course: FetchCourseChaptersSuccessRes["data"];
};
export function SidebarMenuContent({ course }: SidebarMenuContentProps) {
  return (
    <Stack sx={{ flexGrow: 1, p: 1.5, gap: 2 }}>
      <Stack>
        <CourseProgress variant="default" value={course.progressCount} />
        <Typography component={"h1"} variant="h6">
          {course.courseWithChapters.title}
        </Typography>
      </Stack>
      <Stack>
        <List sx={{ gap: 1 }}>
          {course.courseWithChapters.chapters.map((chapter) => (
            <SidebarItem
              key={chapter.id}
              id={chapter.id}
              title={chapter.title}
              isCompleted={!!chapter.progresses?.[0]?.isCompleted}
              courseId={course.courseWithChapters.id}
              isLocked={
                !chapter.isFree && !course.courseWithChapters.purchases.length
              }
            />
          ))}
        </List>
      </Stack>
    </Stack>
  );
}
