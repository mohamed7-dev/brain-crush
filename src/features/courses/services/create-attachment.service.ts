import { db } from "@/server/db";
import { CreateAttachmentSchema } from "../lib/schema";
import { HttpException } from "@/lib/exceptions";
import { ownerOnly } from "@/features/me";
import { attachmentsTable } from "@/server/db/schema";

export async function createAttachmentService(input: CreateAttachmentSchema) {
  const foundCourse = await db.query.coursesTable.findFirst({
    where: (t, { eq }) => eq(t.id, input.courseId),
  });
  if (!foundCourse) throw HttpException.NotFound("Course not found.");
  await ownerOnly(
    foundCourse.creatorId,
    "Forbidden: You are not allowed to add attachments to the course!"
  );
  const newAttachment = await db
    .insert(attachmentsTable)
    .values({
      courseId: foundCourse.id,
      name: input.name,
      url: input.url,
      size: input.size,
      type: input.type,
      key: input.key,
    })
    .returning()
    .then((data) => data[0]);

  return newAttachment;
}
