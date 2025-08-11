"use server";
import { handleError, ValidationException } from "@/lib/exceptions";
import { DeleteChapterSchema, deleteChapterSchema } from "../lib/schema";
import z from "zod";
import { SuccessMutateRes } from "@/lib/type-utils";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";
import { deleteChapterService } from "../services/delete-chapter.service";

async function handleDeletingChapter(input: DeleteChapterSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = deleteChapterSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const deletionResult = await deleteChapterService(parsedData);
  revalidatePath(
    routes.teacherCourseChapter(parsedData.courseId, parsedData.chapterId)
  );
  return {
    success: true,
    statusCode: 200,
    message: "Course chapter has been deleted successfully.",
    data: deletionResult,
  } satisfies SuccessMutateRes<typeof deletionResult>;
}

export async function deleteChapter(input: DeleteChapterSchema) {
  try {
    return await handleDeletingChapter(input);
  } catch (error) {
    return handleError(error);
  }
}
export type DeleteChapterSuccessRes = Awaited<
  ReturnType<typeof handleDeletingChapter>
>;

export type DeleteChapterErrorRes = ReturnType<
  typeof handleError<DeleteChapterSchema>
>;
