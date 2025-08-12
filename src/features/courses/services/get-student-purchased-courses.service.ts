import { userOnly } from "@/features/me/lib/authorization";
import { GET_COURSES_DEFAULT_LIMIT } from "../lib/constants";
import { GetCoursesSchema } from "../lib/schema";
import { db } from "@/server/db";
import { handleCursorPagination } from "@/lib/utils";
import { coursesTable, purchasesTable } from "@/server/db/schema";
import { and, eq, lt, or, sql } from "drizzle-orm";
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
  //  TODO: use this query to enable searching
  //   query
  //     ? sql`to_tsvector('english', ${coursesTable.title}) @@ plainto_tsquery('english', ${query})`
  //     : undefined;

  type CourseWithProgress = (typeof purchasedCourses)[number]["course"] & {
    progress: number;
  };
  const courses = purchasedCourses.map(
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
  const { nextCursor } = handleCursorPagination({
    data: purchasedCourses,
    limit: defaultLimit,
  });
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
