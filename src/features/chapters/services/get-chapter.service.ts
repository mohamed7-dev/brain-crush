import { db } from "@/server/db";
import { GetChapterSchema } from "../lib/schema";
import { HttpException } from "@/lib/exceptions";
import { ownerOnly } from "@/features/me/lib/authorization";

export async function getChapterService(input: GetChapterSchema) {
  const foundChapter = await db.query.chaptersTable.findFirst({
    where: (t, { eq }) => eq(t.id, input.id),
    with: {
      video: true,
      course: {
        columns: {
          creatorId: true,
        },
      },
    },
  });
  await ownerOnly(
    foundChapter?.course.creatorId!,
    "You are not allowed to view this chapter."
  );

  if (!foundChapter) throw HttpException.NotFound("Chapter not found.");

  return foundChapter;
}
