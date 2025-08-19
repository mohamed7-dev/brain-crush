import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { cachedGetCourseChapters } from "./layout";
import { getStudentCoursePageMetadata } from "@/features/courses/lib/metadata";

export async function generateMetadata({ params }: CoursePageProps) {
  const courseId = (await params).courseId;
  const foundCourse = await cachedGetCourseChapters({ id: courseId });
  if ("success" in foundCourse) {
    const course = foundCourse.data.courseWithChapters;
    if (course.title && course.description && course.cover?.publicId) {
      return getStudentCoursePageMetadata(
        course.cover.publicId,
        course.title,
        course.description
      );
    }
  }
}

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};
export default async function CoursePage({ params }: CoursePageProps) {
  const courseId = (await params).courseId;
  const foundCourse = await cachedGetCourseChapters({ id: courseId });

  if ("error" in foundCourse) {
    redirect(routes.home);
  }

  const course = foundCourse.data;
  return redirect(
    routes.courseChapter(
      course?.courseWithChapters?.chapters?.[0].id,
      course?.courseWithChapters?.id
    )
  );
}
