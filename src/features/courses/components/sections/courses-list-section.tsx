"use client";
import React from "react";
import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import { CourseCard } from "../course-card";
import { NoDataPlaceholder } from "@/components/no-data-placeholder";
import { VideoFileOutlined } from "@mui/icons-material";
import { InfiniteLoader } from "@/components/infinite-loader";

export type CourseCard = {
  categoryName: string;
  chaptersLength: number;
  progress: number | null;
  coverImagePublicId: string;
  price: number;
  title: string;
  id: string;
};
type CoursesListSectionProps = {
  courses: CourseCard[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  NoCoursesAction?: React.ReactNode;
  isLoading: boolean;
};

export function CoursesListSection({
  courses,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  NoCoursesAction,
  isLoading,
}: CoursesListSectionProps) {
  return (
    <Stack sx={{ gap: 4 }}>
      <Grid
        container
        columns={13}
        columnGap={4}
        rowGap={2}
        justifyContent={{ xs: "center", md: "start" }}
      >
        {courses.map((course) => (
          <Grid
            key={course.id}
            size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
            sx={{ height: 380 }}
          >
            <CourseCard
              course={{
                ...course,
              }}
            />
          </Grid>
        ))}
      </Grid>
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={40} />
        </Box>
      )}
      {!courses.length && !isLoading && (
        <NoDataPlaceholder
          Icon={VideoFileOutlined}
          message="No courses found"
          Content={NoCoursesAction ?? null}
        />
      )}
      {!!courses.length && !isLoading && (
        <InfiniteLoader
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </Stack>
  );
}
