import { userOnly } from "@/features/me/lib/authorization";
import { db } from "@/server/db";
import {
  chaptersTable,
  coursesTable,
  purchasesTable,
  userProgressTable,
} from "@/server/db/schema";
import { and, eq, sql } from "drizzle-orm";

export async function getStudentCoursesStatsService() {
  const { userId } = await userOnly();
  // 1) Total chapters per course
  const totals = db
    .select({
      courseId: chaptersTable.courseId,
      totalChapters: sql<number>`COUNT(*)`.as("total_chapters"),
    })
    .from(chaptersTable)
    .groupBy(chaptersTable.courseId)
    .as("totals");

  // 2) Completed chapters per course for this user
  const completed = db
    .select({
      courseId: chaptersTable.courseId,
      completedChapters: sql<number>`COUNT(*)`.as("completed_chapters"),
    })
    .from(chaptersTable)
    .innerJoin(
      userProgressTable,
      and(
        eq(userProgressTable.chapterId, chaptersTable.id),
        eq(userProgressTable.userId, userId),
        eq(userProgressTable.isCompleted, true)
      )
    )
    .groupBy(chaptersTable.courseId)
    .as("completed");

  // 3) Per-course rollup only for courses the user purchased
  const perCourse = db
    .select({
      courseId: coursesTable.id,
      totalChapters: totals.totalChapters,
      completedChapters: sql<number>`
        COALESCE(${completed.completedChapters}, 0)
      `.as("completed_chapters"),
    })
    .from(coursesTable)
    .innerJoin(
      purchasesTable,
      and(
        eq(purchasesTable.courseId, coursesTable.id),
        eq(purchasesTable.userId, userId)
      )
    )
    .innerJoin(totals, eq(totals.courseId, coursesTable.id))
    .leftJoin(completed, eq(completed.courseId, coursesTable.id))
    // guard against accidental duplicates from purchases
    .groupBy(coursesTable.id, totals.totalChapters, completed.completedChapters)
    .as("per_course");

  // 4) Final counts
  return await db
    .select({
      completedCourses: sql<number>`
        COUNT(*) FILTER (
          WHERE ${perCourse.completedChapters} = ${perCourse.totalChapters}
        )
      `,
      inProgressCourses: sql<number>`
        COUNT(*) FILTER (
          WHERE ${perCourse.completedChapters} < ${perCourse.totalChapters}
            AND ${perCourse.totalChapters} > 0
        )
      `,
    })
    .from(perCourse);

  // const perCourse = db
  //   .select({
  //     courseId: coursesTable.id,
  //     totalChapters: sql<number>`COUNT(DISTINCT ${chaptersTable.id})`.as(
  //       "total_chapter"
  //     ),
  //     // completed chapters (safe against NULLs)
  //     completedChapters: sql<number>`
  //       SUM(
  //         CASE
  //           WHEN ${userProgressTable.isCompleted} = true THEN 1
  //           ELSE 0
  //         END
  //       )
  //     `.as("completed_chapters"),
  //     // completedChapters:
  //     //   sql<number>`COUNT(DISTINCT CASE WHEN ${userProgressTable.isCompleted} = true THEN ${chaptersTable.id} END)`.as(
  //     //     "completed_chapters"
  //     //   ),
  //   })
  //   .from(coursesTable)
  //   .innerJoin(purchasesTable, eq(coursesTable.id, purchasesTable.courseId))
  //   .innerJoin(chaptersTable, eq(chaptersTable.courseId, coursesTable.id))
  //   .leftJoin(
  //     userProgressTable,
  //     sql`${userProgressTable.userId} = ${userId} AND ${userProgressTable.chapterId} = ${chaptersTable.id}`
  //   )
  //   .where(eq(purchasesTable.userId, userId))
  //   .groupBy(coursesTable.id)
  //   .as("per_course");
  // return await db
  //   .select({
  //     completedCourses: sql<number>`COUNT(*) FILTER (WHERE ${perCourse.completedChapters} = ${perCourse.totalChapters})`,
  //     // inProgressCourses: sql<number>`COUNT(*) FILTER (WHERE ${perCourse.completedChapters} < ${perCourse.totalChapters})`,
  //     inProgressCourses: sql<number>`COUNT(*) FILTER (WHERE COALESCE(${perCourse.completedChapters}, 0) < ${perCourse.totalChapters})`,
  //   })
  //   .from(perCourse);
  // aggregate across all courses
  // return await db
  //   .select({
  //     completedCourses: sql<number>`
  //       COUNT(*)
  //       FILTER (WHERE ${perCourse.completedChapters} = ${perCourse.totalChapters})
  //     `,
  //     inProgressCourses: sql<number>`
  //       COUNT(*)
  //       FILTER (WHERE ${perCourse.completedChapters} < ${perCourse.totalChapters})
  //     `,
  //   })
  //   .from(perCourse);
}
