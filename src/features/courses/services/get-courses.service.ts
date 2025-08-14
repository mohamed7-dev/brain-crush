import { teacherOnly } from "@/features/me/lib/authorization";
import { GET_COURSES_DEFAULT_LIMIT } from "../lib/constants";
import { GetCoursesSchema } from "../lib/schema";
import { db } from "@/server/db";
import { handleCursorPagination } from "@/lib/utils";
import { coursesTable } from "@/server/db/schema";
import { and, eq, sql } from "drizzle-orm";

export async function getCoursesService({
  limit,
  cursor,
  query,
}: GetCoursesSchema) {
  const { userId } = await teacherOnly();
  const defaultLimit = limit || GET_COURSES_DEFAULT_LIMIT;

  const [courses, total] = await Promise.all([
    db.query.coursesTable.findMany({
      where: (t, { eq, and, or, lt, sql }) =>
        and(
          eq(t.creatorId, userId),
          cursor
            ? or(
                lt(t.updatedAt, cursor.updatedAt),
                and(eq(t.updatedAt, cursor.updatedAt), lt(t.id, cursor.id))
              )
            : undefined,
          query
            ? sql`to_tsvector('english', ${t.title}) @@ plainto_tsquery('english', ${query})`
            : undefined
        ),
      limit: defaultLimit + 1,
      orderBy: (t, { desc }) => [desc(t.updatedAt), desc(t.id)],
    }),
    db.$count(
      coursesTable,
      and(
        eq(coursesTable.creatorId, userId),
        query
          ? sql`to_tsvector('english', ${coursesTable.title}) @@ plainto_tsquery('english', ${query})`
          : undefined
      )
    ),
  ]);

  const { nextCursor, data: items } = handleCursorPagination({
    data: courses,
    limit: defaultLimit,
  });

  return {
    data: items,
    total,
    nextCursor: nextCursor
      ? { updatedAt: nextCursor.updatedAt, id: nextCursor.id }
      : undefined,
  };
}
