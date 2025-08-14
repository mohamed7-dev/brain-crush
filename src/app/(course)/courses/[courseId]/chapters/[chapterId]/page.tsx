import React from "react";
import { fetchStudentChapter } from "@/features/chapters/api/fetch-student-chapter.api";
import { StudentChapterPageView } from "@/features/chapters/components/views/student-chapter-page-view";
import { notFound } from "next/navigation";

type ChapterPageProps = {
  params: Promise<{ courseId: string; chapterId: string }>;
};
export default async function ChapterPage({ params }: ChapterPageProps) {
  const { courseId, chapterId } = await params;
  const foundChapter = await fetchStudentChapter({ chapterId, courseId });

  if ("error" in foundChapter) {
    if (foundChapter.statusCode === 404) return notFound();
    throw new Error(foundChapter.message);
  }

  return <StudentChapterPageView chapter={foundChapter.data} />;
}
