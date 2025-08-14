import { db } from "@/server/db";
import { DeleteAttachmentSchema } from "../lib/schema";
import { assetsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { ownerOnly, teacherOnly } from "@/features/me/lib/authorization";
import { HttpException } from "@/lib/exceptions";
import cloudinary from "@/config/cloudinary.config";

export async function deleteAttachmentService(input: DeleteAttachmentSchema) {
  await teacherOnly();
  const foundCourse = await db.query.coursesTable.findFirst({
    where: (t, { eq }) => eq(t.id, input.courseId),
  });
  if (!foundCourse) throw HttpException.NotFound("Course not found.");
  await ownerOnly(
    foundCourse.creatorId,
    "Forbidden: You are not allowed to delete the attachment."
  );

  const foundAttachment = await db.query.attachmentsTable.findFirst({
    where: (t, { eq }) => eq(t.id, input.id),
    with: {
      asset: true,
    },
  });
  if (!foundAttachment) throw HttpException.NotFound("Attachment not found.");

  await Promise.all([
    cloudinary.uploader.destroy(foundAttachment.asset.publicId, {
      resource_type: "raw",
    }),
    db.delete(assetsTable).where(eq(assetsTable.id, foundAttachment.assetId)),
  ]);

  return { done: true, resourceId: input.id };
}
