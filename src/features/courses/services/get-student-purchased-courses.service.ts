import { userOnly } from "@/features/me/lib/authorization";
import { GET_COURSES_DEFAULT_LIMIT } from "../lib/constants";
import { GetCoursesSchema } from "../lib/schema";
import { db } from "@/server/db";
import { handleCursorPagination } from "@/lib/utils";
import { purchasesTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { getProgressService } from "./get-progress.service";

export async function getStudentPurchasedCoursesService({
  limit,
  cursor,
  query,
}: GetCoursesSchema) {
  const { userId } = await userOnly();

  const defaultLimit = limit || GET_COURSES_DEFAULT_LIMIT;

  const [purchasedCourses, total] = await Promise.all([
    db.query.purchasesTable.findMany({
      where: (t, { eq, and, or, lt, sql }) =>
        and(
          eq(t.userId, userId),
          cursor
            ? or(
                lt(t.updatedAt, cursor.updatedAt),
                and(eq(t.updatedAt, cursor.updatedAt), lt(t.id, cursor.id))
              )
            : undefined
        ),
      limit: defaultLimit + 1,
      orderBy: (t, { desc }) => [desc(t.updatedAt), desc(t.id)],
      with: {
        course: {
          with: {
            category: true,
            chapters: {
              where: (t, { eq }) => eq(t.isPublished, true),
            },
            cover: true,
          },
        },
      },
    }),
    db.$count(purchasesTable, eq(purchasesTable.userId, userId)),
  ]);

  const { nextCursor, data: paginatedCourses } = handleCursorPagination({
    data: purchasedCourses,
    limit: defaultLimit,
  });

  type CourseWithProgress = (typeof paginatedCourses)[number]["course"] & {
    progress: number;
  };
  const courses = paginatedCourses.map(
    (purchase) => purchase.course
  ) as unknown as CourseWithProgress[];

  for (const course of courses) {
    const progress = await getProgressService({ courseId: course.id, userId });
    course["progress"] = progress;
  }

  const completedCourses = courses.filter((course) => course.progress === 100);
  const coursesInProgress = courses.filter(
    (course) => (course.progress ?? 0) < 100
  );

  return {
    data: {
      completedCourses,
      coursesInProgress,
    },
    total,
    nextCursor: nextCursor
      ? { updatedAt: nextCursor.updatedAt, id: nextCursor.id }
      : undefined,
  };
}
