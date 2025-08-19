"use client";
import React from "react";
import { useBrowseCourses } from "../../hooks/use-browse-courses";
import { CourseCard, CoursesListSection } from "./courses-list-section";

export function HomePageCoursesSection() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    useBrowseCourses({ variant: "View" });
  const courses = data?.pages?.flatMap((p) => p.data) ?? [];
  const coursesInList = courses.map(
    (course) =>
      ({
        id: course.id,
        title: course.title,
        categoryName: course?.category?.name ?? "",
        price: course.price ?? 0,
        chaptersLength: course.chapters.length ?? 0,
        progress: null,
        coverImagePublicId: course.cover?.publicId ?? "",
      } satisfies CourseCard)
  );
  return (
    <CoursesListSection
      courses={coursesInList}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
    />
  );
}
