import { userOnly } from "@/features/me/lib/authorization";
import { ProgressChapterSchema } from "../lib/schema";
import { db } from "@/server/db";
import { HttpException } from "@/lib/exceptions";
import { userProgressTable } from "@/server/db/schema";

export async function progressChapterService(input: ProgressChapterSchema) {
  const { userId } = await userOnly();
  const { chapterId, isCompleted } = input;
  const foundChapter = await db.query.chaptersTable.findFirst({
    where: (t, { eq, and }) =>
      and(eq(t.isPublished, true), eq(t.id, chapterId)),
  });
  if (!foundChapter) throw HttpException.NotFound("Chapter not found.");

  const userProgress = await db
    .insert(userProgressTable)
    .values({ userId, chapterId, isCompleted })
    .onConflictDoUpdate({
      target: [userProgressTable.userId, userProgressTable.chapterId],
      set: { isCompleted },
    })
    .returning()
    .then((data) => data[0])
    .catch((e) => console.log(e));

  return userProgress;
}
