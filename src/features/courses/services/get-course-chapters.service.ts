import { db } from "@/server/db";
import { GetCourseSchema } from "../lib/schema";
import { userOnly } from "@/features/me/lib/authorization";
import { HttpException } from "@/lib/exceptions";
import { getProgressService } from "./get-progress.service";

export async function getCourseChaptersService(input: GetCourseSchema) {
  const { userId } = await userOnly();
  const foundCourseWithChapters = await db.query.coursesTable.findFirst({
    where: (t, { eq, and }) => and(eq(t.isPublished, true), eq(t.id, input.id)),
    with: {
      purchases: {
        where: (t, { eq, and }) =>
          and(eq(t.userId, userId), eq(t.courseId, input.id)),
      },
      chapters: {
        where: (t, { eq }) => eq(t.isPublished, true),
        with: {
          progresses: {
            where: (t, { eq }) => eq(t.userId, userId),
          },
        },
        orderBy: (t, { asc }) => asc(t.position),
      },
    },
  });

  if (!foundCourseWithChapters)
    throw HttpException.NotFound("Course not found!");

  const progressCount = await getProgressService({
    userId,
    courseId: foundCourseWithChapters.id,
  });

  return { courseWithChapters: foundCourseWithChapters, progressCount };
}
