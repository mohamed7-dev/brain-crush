import { db } from "@/server/db";
import { userProgressTable } from "@/server/db/schema";
import { and, eq, inArray } from "drizzle-orm";

export async function getProgressService(input: {
  userId: string;
  courseId: string;
}) {
  const { courseId, userId } = input;
  const publishedChapters = await db.query.chaptersTable.findMany({
    where: (t, { and, eq }) =>
      and(eq(t.isPublished, true), eq(t.courseId, courseId)),
    columns: {
      id: true,
    },
  });
  const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);
  const validCompletedChapters = await db.$count(
    userProgressTable,
    and(
      eq(userProgressTable.isCompleted, true),
      eq(userProgressTable.userId, userId),
      inArray(userProgressTable.chapterId, publishedChaptersIds)
    )
  );
  const progressPercentage =
    (validCompletedChapters / publishedChaptersIds.length) * 100;

  return progressPercentage;
}
