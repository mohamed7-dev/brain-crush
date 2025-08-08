import React from "react";
import { ChapterPageView } from "@/features/chapters/components/views/chapter-page-view";
import { notFound } from "next/navigation";
import { fetchChapter } from "@/features/chapters/api/fetch-chapter.api";

type CourseChapterPageProps = {
  params: Promise<{ chapterId: string }>;
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
