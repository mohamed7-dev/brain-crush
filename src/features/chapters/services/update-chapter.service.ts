import { db } from "@/server/db";
import { UpdateChapterSchema } from "../lib/schema";
import { HttpException } from "@/lib/exceptions";
import { ownerOnly } from "@/features/me/lib/authorization";
import { chaptersTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function updateChapterService(input: UpdateChapterSchema) {
  const foundChapter = await db.query.chaptersTable.findFirst({
    where: (t, { eq }) => eq(t.id, input.id),
    with: {
      course: {
        columns: {
          creatorId: true,
        },
      },
    },
  });
  if (!foundChapter) throw HttpException.NotFound("Chapter not found.");
  await ownerOnly(
    foundChapter.course.creatorId,
    "You are not allowed to update this chapter."
  );
  const updatedChapter = await db
    .update(chaptersTable)
    .set({
      ...input.data,
      updatedAt: new Date(),
    })
    .where(eq(chaptersTable.id, input.id))
    .returning()
    .then((data) => data[0]);

  return updatedChapter;
}
