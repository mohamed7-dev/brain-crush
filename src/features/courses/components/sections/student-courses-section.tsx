"use client";
import React from "react";
import { CourseCard, CoursesListSection } from "./courses-list-section";
import { useGetStudentPurchasedCourses } from "../../hooks/use-get-student-purchased-courses";
import { Button } from "@mui/material";
import { routes } from "@/lib/routes";

export function StudentCoursesSection() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    useGetStudentPurchasedCourses({});
  const coursesWithProgresses =
    data.pages.flatMap((p) => [
      ...p.data.completedCourses,
      ...p.data.coursesInProgress,
    ]) ?? [];
  const coursesInList = coursesWithProgresses.map(
    (courseWithProgress) =>
      ({
        id: courseWithProgress.id,
        title: courseWithProgress.title,
        categoryName: courseWithProgress?.category?.name!,
        price: courseWithProgress.price!,
        chaptersLength: courseWithProgress.chapters.length!,
        progress: courseWithProgress.progress,
        coverImagePublicId: courseWithProgress.cover?.publicId!,
      } satisfies CourseCard)
  );

  return (
    <CoursesListSection
      courses={coursesInList}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      NoCoursesAction={
        <Button href={routes.home} variant="outlined">
          Start here
        </Button>
      }
    />
  );
}
