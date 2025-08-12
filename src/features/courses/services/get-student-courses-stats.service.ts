import { userOnly } from "@/features/me/lib/authorization";
import { db } from "@/server/db";
import {
  chaptersTable,
  coursesTable,
  purchasesTable,
  userProgressTable,
} from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getStudentCoursesStatsService() {
  const { userId } = await userOnly();
  const perCourse = db
    .select({
      courseId: coursesTable.id,
      totalChapters: sql<number>`COUNT(DISTINCT ${chaptersTable.id})`.as(
        "total_chapter"
      ),
      completedChapters:
        sql<number>`COUNT(DISTINCT CASE WHEN ${userProgressTable.isCompleted} = true THEN ${chaptersTable.id} END)`.as(
          "completed_chapters"
        ),
    })
    .from(coursesTable)
    .innerJoin(purchasesTable, eq(coursesTable.id, purchasesTable.courseId))
    .innerJoin(chaptersTable, eq(chaptersTable.courseId, coursesTable.id))
    .leftJoin(
      userProgressTable,
      sql`${userProgressTable.userId} = ${userId} AND ${userProgressTable.chapterId} = ${chaptersTable.id}`
    )
    .where(eq(purchasesTable.userId, userId))
    .groupBy(coursesTable.id)
    .as("per_course");
  return await db
    .select({
      completedCourses: sql<number>`COUNT(*) FILTER (WHERE ${perCourse.completedChapters} = ${perCourse.totalChapters})`,
      inProgressCourses: sql<number>`COUNT(*) FILTER (WHERE ${perCourse.completedChapters} < ${perCourse.totalChapters})`,
    })
    .from(perCourse);
}
