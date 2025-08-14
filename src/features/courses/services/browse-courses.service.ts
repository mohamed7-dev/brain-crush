import { db } from "@/server/db";
import { BrowseCoursesSchema } from "../lib/schema";
import { userOnly } from "@/features/me/lib/authorization";
import { coursesTable, purchasesTable } from "@/server/db/schema";
import { HttpException } from "@/lib/exceptions";
import { BROWSE_COURSES_DEFAULT_LIMIT } from "../lib/constants";
import { handleCursorPagination } from "@/lib/utils";
import { and, eq, lt, notExists } from "drizzle-orm";

async function getVisitorCourses(input: BrowseCoursesSchema) {
  const { limit, query, cursor } = input;
  const [courses, total] = await Promise.all([
    db.query.coursesTable.findMany({
      where: (t, { eq, and, or, lt, sql }) =>
        and(
          eq(t.isPublished, true),
          cursor
            ? or(
                lt(t.createdAt, cursor.createdAt),
                and(eq(t.createdAt, cursor.createdAt), lt(t.id, cursor.id))
              )
            : undefined,
          query
            ? sql`to_tsvector('english', ${t.title}) @@ plainto_tsquery('english', ${query})`
            : undefined
        ),
      with: {
        category: true,
        chapters: {
          columns: {
            id: true,
          },
        },
        cover: true,
      },
      limit: limit! + 1,
      orderBy: (t, { desc }) => [desc(t.createdAt), desc(t.id)],
    }),
    db.$count(coursesTable, and(eq(coursesTable.isPublished, true))),
  ]);
  const { data: items, nextCursor } = handleCursorPagination({
    data: courses,
    limit: limit!,
  });

  return {
    data: items,
    total,
    nextCursor: nextCursor
      ? { createdAt: nextCursor?.createdAt, id: nextCursor.id }
      : undefined,
  };
}

export async function browseCoursesService(input: BrowseCoursesSchema) {
  const { limit, query, cursor } = input;
  const defaultLimit = limit ?? BROWSE_COURSES_DEFAULT_LIMIT;
  try {
    const { userId } = await userOnly();

    const [courses, total] = await Promise.all([
      db.query.coursesTable.findMany({
        where: (t, { and, eq, notExists, or, sql }) =>
          and(
            eq(t.isPublished, true),
            notExists(
              db
                .select()
                .from(purchasesTable)
                .where(
                  and(
                    eq(t.id, purchasesTable.courseId),
                    eq(purchasesTable.userId, userId)
                  )
                )
            ),
            cursor
              ? or(
                  lt(t.createdAt, cursor.createdAt),
                  and(eq(t.createdAt, cursor.createdAt), lt(t.id, cursor.id))
                )
              : undefined,
            query
              ? sql`to_tsvector('english', ${t.title}) @@ plainto_tsquery('english', ${query})`
              : undefined
          ),
        with: {
          purchases: true,
          category: true,
          chapters: {
            columns: {
              id: true,
            },
          },
          cover: true,
        },
        limit: defaultLimit + 1,
        orderBy: (t, { desc }) => [desc(t.createdAt), desc(t.id)],
      }),
      db.$count(
        coursesTable,
        and(
          eq(coursesTable.isPublished, true),
          notExists(
            db
              .select()
              .from(purchasesTable)
              .where(
                and(
                  eq(coursesTable.id, purchasesTable.courseId),
                  eq(purchasesTable.userId, userId)
                )
              )
          )
        )
      ),
    ]);

    const { data: items, nextCursor } = handleCursorPagination({
      data: courses,
      limit: defaultLimit,
    });

    return {
      data: items,
      total,
      nextCursor: nextCursor
        ? { createdAt: nextCursor?.createdAt, id: nextCursor.id }
        : undefined,
    };
  } catch (error) {
    if (error instanceof HttpException && error.statusCode === 401) {
      return await getVisitorCourses({ ...input, limit: defaultLimit });
    }
    throw error;
  }
}
