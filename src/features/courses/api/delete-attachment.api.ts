"use server";
import z from "zod";
import { handleError, ValidationException } from "@/lib/exceptions";
import { deleteAttachmentSchema, DeleteAttachmentSchema } from "../lib/schema";
import { SuccessMutateRes } from "../../../lib/type-utils";
import { deleteAttachmentService } from "../services/delete-attachment.service";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";

async function handleDeletingAttachment(input: DeleteAttachmentSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = deleteAttachmentSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const deletedRes = await deleteAttachmentService(parsedData);
  revalidatePath(routes.teacherCourse(parsedData.courseId));
  return {
    success: true,
    statusCode: 200,
    message: "Attachment has been deleted successfully.",
    data: deletedRes,
  } satisfies SuccessMutateRes<typeof deletedRes>;
}

export async function deleteAttachment(input: DeleteAttachmentSchema) {
  try {
    return await handleDeletingAttachment(input);
  } catch (error) {
    return handleError(error);
  }
}

export type DeleteAttachmentSuccessRes = Awaited<
  ReturnType<typeof handleDeletingAttachment>
>;

export type DeleteAttachmentErrorRes = ReturnType<
  typeof handleError<DeleteAttachmentSchema>
>;
