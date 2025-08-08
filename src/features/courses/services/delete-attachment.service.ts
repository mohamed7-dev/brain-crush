import { db } from "@/server/db";
import { DeleteAttachmentSchema } from "../lib/schema";
import { attachmentsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { ownerOnly } from "@/features/me/lib/authorization";
import { HttpException } from "@/lib/exceptions";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

export async function deleteAttachmentService(input: DeleteAttachmentSchema) {
  const foundCourse = await db.query.coursesTable.findFirst({
    where: (t, { eq }) => eq(t.id, input.courseId),
  });
  if (!foundCourse) throw HttpException.NotFound("Course not found.");
  await ownerOnly(
    foundCourse.creatorId,
    "Forbidden: You are not allowed to delete the attachment."
  );
  await Promise.all([
    utapi.deleteFiles([input.fileKey]),
    db.delete(attachmentsTable).where(eq(attachmentsTable.id, input.id)),
  ]);

  return { done: true, resourceId: input.id };
}
