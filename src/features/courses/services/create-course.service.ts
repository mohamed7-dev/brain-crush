import { db } from "@/server/db";
import { CreateCourseSchema } from "../lib/schema";
import { coursesTable } from "@/server/db/schema";
import { userOnly } from "@/features/me";

export async function createCourseService(input: CreateCourseSchema) {
  const { userId } = await userOnly();
  const newCourse = await db
    .insert(coursesTable)
    .values({ title: input.title, creatorId: userId })
    .returning()
    .then((data) => data[0]);

  return newCourse;
}
