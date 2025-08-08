"use server";

import { handleError, ValidationException } from "@/lib/exceptions";
import { updateChapterSchema, UpdateChapterSchema } from "../lib/schema";
import z from "zod";
import { updateChapterService } from "../services/update-chapter.service";
import { SuccessMutateRes } from "@/lib/type-utils";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";

async function handleUpdatingChapter(input: UpdateChapterSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = updateChapterSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const updatedChapter = await updateChapterService(parsedData);
  revalidatePath(
    routes.teacherCourseChapter(parsedData.courseId, parsedData.id)
  );
  return {
    success: true,
    statusCode: 200,
    message: "Course chapter has been updated successfully.",
    data: updatedChapter,
  } satisfies SuccessMutateRes<typeof updatedChapter>;
}

export async function updateChapter(input: UpdateChapterSchema) {
  try {
    return await handleUpdatingChapter(input);
  } catch (error) {
    return handleError(error);
  }
}
export type UpdateChapterSuccessRes = Awaited<
  ReturnType<typeof handleUpdatingChapter>
>;

export type UpdateChapterErrorRes = ReturnType<
  typeof handleError<UpdateChapterSchema>
>;
