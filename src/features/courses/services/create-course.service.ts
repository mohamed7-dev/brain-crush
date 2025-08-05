import { db } from "@/server/db";
import { CreateCourseSchema } from "../lib/schema";
import { coursesTable } from "@/server/db/schema";

export async function createCourseService(input: CreateCourseSchema) {
  const newCourse = await db
    .insert(coursesTable)
    .values(input)
    .returning()
    .then((data) => data[0]);

  return newCourse;
}
