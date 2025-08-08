"use server";
import z from "zod";
import { handleError, ValidationException } from "@/lib/exceptions";
import { createAttachmentSchema, CreateAttachmentSchema } from "../lib/schema";
import { SuccessMutateRes } from "../../../lib/type-utils";
import { createAttachmentService } from "../services/create-attachment.service";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";

async function handleCreatingAttachment(input: CreateAttachmentSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = createAttachmentSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const newAttachment = await createAttachmentService(parsedData);
  revalidatePath(routes.teacherCourse(parsedData.courseId));

  return {
    success: true,
    statusCode: 201,
    message: "Attachment has been attached to the course successfully.",
    data: newAttachment,
  } satisfies SuccessMutateRes<typeof newAttachment>;
}

export async function createAttachment(input: CreateAttachmentSchema) {
  try {
    return await handleCreatingAttachment(input);
  } catch (error) {
    return handleError(error);
  }
}

export type CreateAttachmentSuccessRes = Awaited<
  ReturnType<typeof handleCreatingAttachment>
>;

export type CreateAttachmentErrorRes = ReturnType<
  typeof handleError<CreateAttachmentSchema>
>;
