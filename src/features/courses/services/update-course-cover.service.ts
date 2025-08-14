import { db } from "@/server/db";
import { HttpException } from "@/lib/exceptions";
import { ownerOnly, teacherOnly } from "@/features/me/lib/authorization";
import { assetsTable, coursesTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { UpdateCourseCoverSchema } from "../lib/schema";
import cloudinary from "@/config/cloudinary.config";

export async function updateCourseCoverService(input: UpdateCourseCoverSchema) {
  await teacherOnly();
  const { courseId, coverImage } = input;
  const foundCourse = await db.query.coursesTable.findFirst({
    where: (t, { eq }) => eq(t.id, input.courseId),
    with: {
      cover: {
        columns: {
          publicId: true,
        },
      },
    },
  });
  if (!foundCourse) throw HttpException.NotFound("Course not found.");

  await ownerOnly(
    foundCourse.creatorId,
    "You are not allowed to update this course."
  );

  const updatedCourse = await db.transaction(async (tx) => {
    if (foundCourse.coverId && foundCourse.cover?.publicId) {
      await cloudinary.uploader.destroy(foundCourse.cover.publicId, {
        resource_type: "image",
      });
      await tx
        .delete(assetsTable)
        .where(eq(assetsTable.id, foundCourse.coverId));
    }

    const newAsset = await tx
      .insert(assetsTable)
      .values(coverImage)
      .returning()
      .then((data) => data[0]);

    return await tx
      .update(coursesTable)
      .set({ coverId: newAsset.id })
      .where(eq(coursesTable.id, courseId))
      .returning()
      .then((data) => data[0]);
  });
  return updatedCourse;
}
