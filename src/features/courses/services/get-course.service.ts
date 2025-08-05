import { HttpException } from "@/lib/exceptions";
import { db } from "@/server/db";
import { coursesTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { GetCourseSchema } from "../lib/schema";

export async function getCourseService(input: GetCourseSchema) {
  const foundCourse = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.id, input.id))
    .then((data) => data[0]);

  if (!foundCourse) throw HttpException.NotFound("Course not found!");

  return foundCourse;
}
