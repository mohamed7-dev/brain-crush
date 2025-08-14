import { HttpException } from "@/lib/exceptions";
import { db } from "@/server/db";
import { chaptersTable, coursesTable } from "@/server/db/schema";
import { asc, eq } from "drizzle-orm";
import { GetCourseSchema } from "../lib/schema";
import { teacherOnly } from "@/features/me/lib/authorization";

export async function getCourseService(input: GetCourseSchema) {
  await teacherOnly();
  const foundCourse = await db.query.coursesTable.findFirst({
    where: eq(coursesTable.id, input.id),
    with: {
      attachments: {
        with: {
          asset: true,
        },
      },
      chapters: {
        orderBy: asc(chaptersTable.position),
      },
      cover: true,
    },
  });

  if (!foundCourse) throw HttpException.NotFound("Course not found!");

  return foundCourse;
}
