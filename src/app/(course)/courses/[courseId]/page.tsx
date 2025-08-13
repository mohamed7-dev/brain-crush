import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { cachedGetCourseChapters } from "./layout";

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};
export default async function CoursePage({ params }: CoursePageProps) {
  const courseId = (await params).courseId;
  const foundCourse = await cachedGetCourseChapters({ id: courseId });
  if ("error" in foundCourse) {
    redirect(routes.home);
  }

  return redirect(
    routes.courseChapter(
      foundCourse.data.courseWithChapters.chapters[0].id,
      foundCourse.data.courseWithChapters.id
    )
  );
}
