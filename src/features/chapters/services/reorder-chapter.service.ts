import { db } from "@/server/db";
import { ReorderChapterSchema } from "../lib/schema";
import { HttpException } from "@/lib/exceptions";
import { ownerOnly, userOnly } from "@/features/me/lib/authorization";
import { eq } from "drizzle-orm";
import { chaptersTable } from "@/server/db/schema";

export async function reorderChapterService(input: ReorderChapterSchema) {
  await userOnly();
  const foundCourse = await db.query.coursesTable.findFirst({
    where: (t, { eq }) => eq(t.id, input.courseId),
  });

  if (!foundCourse) throw HttpException.NotFound("Course not found.");

  await ownerOnly(
    foundCourse.creatorId,
    "You are not allowed to reorder chapters of that course."
  );

  const updatedChapters = await Promise.all(
    input.reorderData.map((item) =>
      db
        .update(chaptersTable)
        .set({ position: item.position })
        .where(eq(chaptersTable.id, item.id))
        .returning()
        .then((data) => data[0])
    )
  );

  return updatedChapters;
}
