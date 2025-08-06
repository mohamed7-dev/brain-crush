import { db } from "@/server/db";
import { UpdateCourseSchema } from "../lib/schema";
import { coursesTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function updateCourseService(input: UpdateCourseSchema) {
  const dataToUpdate = { ...input.dataToUpdate, updatedAt: new Date() };

  // TODO: delete old cover image if new imageURL is provided
  const updatedCourse = await db
    .update(coursesTable)
    .set(dataToUpdate)
    .where(eq(coursesTable.id, input.courseId))
    .returning()
    .then((data) => data[0]);

  return updatedCourse;
}
