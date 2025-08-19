import React from "react";
import { fetchStudentChapter } from "@/features/chapters/api/fetch-student-chapter.api";
import { StudentChapterPageView } from "@/features/chapters/components/views/student-chapter-page-view";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { fetchCourseChapters } from "@/features/courses/api/fetch-course-chapters.api";

const cachedFetchStudentChapter = React.cache(fetchStudentChapter);

// export async function generateStaticParams({
//   params,
// }: {
//   params: { courseId: string };
// }) {
//   const { courseId } = params;
//   console.log(courseId);

//   const course = await fetchCourseChapters({ id: courseId });
//   if ("success" in course) {
//     return course.data.courseWithChapters.chapters.map((chapter) => ({
//       chapterId: chapter.id,
//     }));
//   }
//   return [];
// }

export async function generateMetadata(
  { params }: ChapterPageProps,
  parent: ResolvingMetadata
) {
  const { courseId, chapterId } = await params;
  const foundChapter = await cachedFetchStudentChapter({ chapterId, courseId });
  if ("success" in foundChapter) {
    const previousImages = (await parent).openGraph?.images || [];
    return {
      title: foundChapter.data.title,
      description: foundChapter.data.description!,
      openGraph: {
        images: [...previousImages],
      },
    } satisfies Metadata;
  }
}

type ChapterPageProps = {
  params: Promise<{ courseId: string; chapterId: string }>;
};
export default async function ChapterPage({ params }: ChapterPageProps) {
  const { courseId, chapterId } = await params;
  const foundChapter = await cachedFetchStudentChapter({ chapterId, courseId });

  if ("error" in foundChapter) {
    if (foundChapter.statusCode === 404) return notFound();
    throw new Error(foundChapter.message);
  }

  return <StudentChapterPageView chapter={foundChapter.data} />;
}
