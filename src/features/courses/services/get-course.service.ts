import { HttpException } from "@/lib/exceptions";
import { db } from "@/server/db";
import { chaptersTable, coursesTable } from "@/server/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { GetCourseSchema } from "../lib/schema";

export async function getCourseService(input: GetCourseSchema) {
  const foundCourse = await db.query.coursesTable.findFirst({
    where: eq(coursesTable.id, input.id),
    with: {
      attachments: true,
      chapters: {
        orderBy: asc(chaptersTable.position),
      },
    },
  });

  if (!foundCourse) throw HttpException.NotFound("Course not found!");

  return foundCourse;
}
