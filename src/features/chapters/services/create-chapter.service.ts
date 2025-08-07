import { db } from "@/server/db";
import { CreateChapterSchema } from "../lib/schema";
import { HttpException } from "@/lib/exceptions";
import { ownerOnly } from "@/features/me";
import { desc } from "drizzle-orm";
import { chaptersTable } from "@/server/db/schema";

export async function createChapterService(input: CreateChapterSchema) {
  const foundCourse = await db.query.coursesTable.findFirst({
    where: (t, { eq }) => eq(t.id, input.courseId),
  });
  if (!foundCourse) throw HttpException.NotFound("Course not found.");
  await ownerOnly(
    foundCourse.creatorId,
    "You are not allowed to add chapters to the course."
  );
  const lastChapter = await db.query.chaptersTable.findFirst({
    where: (t, { eq }) => eq(t.courseId, input.courseId),
    orderBy: desc(chaptersTable.position),
  });
  const newPosition = lastChapter ? lastChapter.position + 1 : 1;
  const newChapter = await db
    .insert(chaptersTable)
    .values({ ...input, position: newPosition })
    .returning()
    .then((data) => data[0]);
  return newChapter;
}
