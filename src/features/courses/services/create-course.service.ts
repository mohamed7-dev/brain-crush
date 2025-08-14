import { db } from "@/server/db";
import { CreateCourseSchema } from "../lib/schema";
import { coursesTable } from "@/server/db/schema";
import { teacherOnly } from "@/features/me/lib/authorization";

export async function createCourseService(input: CreateCourseSchema) {
  const { userId } = await teacherOnly();
  const newCourse = await db
    .insert(coursesTable)
    .values({ title: input.title, creatorId: userId })
    .returning()
    .then((data) => data[0]);

  return newCourse;
}
