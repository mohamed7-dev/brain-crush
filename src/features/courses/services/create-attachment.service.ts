import { db } from "@/server/db";
import { CreateAttachmentSchema } from "../lib/schema";
import { HttpException } from "@/lib/exceptions";
import { ownerOnly, teacherOnly } from "@/features/me/lib/authorization";
import { assetsTable, attachmentsTable } from "@/server/db/schema";

export async function createAttachmentService(input: CreateAttachmentSchema) {
  await teacherOnly();
  const { asset, courseId } = input;
  const foundCourse = await db.query.coursesTable.findFirst({
    where: (t, { eq }) => eq(t.id, courseId),
  });

  if (!foundCourse) throw HttpException.NotFound("Course not found.");
  await ownerOnly(
    foundCourse.creatorId,
    "Forbidden: You are not allowed to add attachments to the course!"
  );

  const newAttachment = await db
    .transaction(async (tx) => {
      const newAsset = await tx
        .insert(assetsTable)
        .values(asset)
        .returning()
        .then((data) => data[0]);

      return await tx
        .insert(attachmentsTable)
        .values({
          courseId: foundCourse.id,
          assetId: newAsset.id,
        })
        .returning()
        .then((data) => data[0]);
    })
    .catch((err) => console.log(err));

  return newAttachment;
}
