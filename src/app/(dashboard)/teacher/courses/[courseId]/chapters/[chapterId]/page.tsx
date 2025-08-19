import React from "react";
import { ChapterPageView } from "@/features/chapters/components/views/chapter-page-view";
import { notFound } from "next/navigation";
import { fetchChapter } from "@/features/chapters/api/fetch-chapter.api";
import { Metadata } from "next";

const cachedFetchChapter = React.cache(fetchChapter);

// export async function generateStaticParams({ params }: CourseChapterPageProps) {
//   const courseId = (await params).courseId;
//   const foundCourse = await fetchCourse({ id: courseId });
//   if ("success" in foundCourse) {
//     return foundCourse.data.chapters.map((ch) => ({
//       chapterId: ch.id,
//     }));
//   }
//   return [];
// }

export async function generateMetadata({ params }: CourseChapterPageProps) {
  const chapterId = (await params).chapterId;
  const foundChapter = await cachedFetchChapter({ id: chapterId });
  if ("success" in foundChapter) {
    return {
      title: foundChapter.data.title,
      description: foundChapter.data.description,
    } satisfies Metadata;
  }
}

type CourseChapterPageProps = {
  params: Promise<{ chapterId: string; courseId: string }>;
};
export default async function CourseChapterPage({
  params,
}: CourseChapterPageProps) {
  const chapterId = (await params).chapterId;
  const foundChapter = await fetchChapter({ id: chapterId });
  if ("error" in foundChapter) {
    if (foundChapter.statusCode === 404) return notFound();
    throw new Error(foundChapter.message);
  }
  return <ChapterPageView chapter={foundChapter.data} />;
}
