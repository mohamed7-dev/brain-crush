import { db } from "@/server/db";
import { GetCourseSchema } from "../lib/schema";
import { userOnly } from "@/features/me/lib/authorization";
import { HttpException } from "@/lib/exceptions";
import { getProgressService } from "./get-progress.service";
import { chaptersTable } from "@/server/db/schema";

async function getVisitorCourseChapters(input: GetCourseSchema) {
  const foundCourseWithChapters = await db.query.coursesTable.findFirst({
    where: (t, { eq, and }) => and(eq(t.isPublished, true), eq(t.id, input.id)),
    with: {
      chapters: {
        where: (t, { eq }) => eq(t.isPublished, true),
        orderBy: (t, { asc }) => asc(t.position),
      },
    },
  });
  if (!foundCourseWithChapters)
    throw HttpException.NotFound("Course not found!");

  return {
    courseWithChapters: {
      ...foundCourseWithChapters,
      purchases: [],
      chapters: foundCourseWithChapters?.chapters.map((ch) => ({
        ...ch,
        progresses: [],
      })),
    },
    progressCount: 0,
  };
}

export async function getCourseChaptersService(input: GetCourseSchema) {
  try {
    const { userId } = await userOnly();
    const foundCourseWithChapters = await db.query.coursesTable.findFirst({
      where: (t, { eq, and }) =>
        and(eq(t.isPublished, true), eq(t.id, input.id)),
      with: {
        purchases: {
          where: (t, { eq, and }) =>
            and(eq(t.userId, userId), eq(t.courseId, input.id)),
        },
        chapters: {
          where: (t, { eq }) => eq(t.isPublished, true),
          with: {
            progresses: {
              where: (t, { eq, and }) =>
                and(eq(t.chapterId, chaptersTable.id), eq(t.userId, userId)),
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
  } catch (error) {
    if (error instanceof HttpException && error.statusCode === 401) {
      return await getVisitorCourseChapters(input);
    }
    throw error;
  }
}
