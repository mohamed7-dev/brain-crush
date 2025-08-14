"use server";

import { handleError, ValidationException } from "@/lib/exceptions";
import { ProgressChapterSchema, progressChapterSchema } from "../lib/schema";
import z from "zod";
import { progressChapterService } from "../services/progress-chapter.service";
import { SuccessMutateRes } from "@/lib/type-utils";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";

async function handleProgressingChapter(input: ProgressChapterSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = progressChapterSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const data = await progressChapterService(parsedData);
  revalidatePath(
    routes.courseChapter(parsedData.chapterId, parsedData.courseId)
  );
  return {
    success: true,
    statusCode: 200,
    message: "Course chapter has been progressed successfully.",
    data: data,
  } satisfies SuccessMutateRes<typeof data>;
}

export async function progressChapter(input: ProgressChapterSchema) {
  try {
    return await handleProgressingChapter(input);
  } catch (error) {
    return handleError(error);
  }
}
export type ProgressChapterSuccessRes = Awaited<
  ReturnType<typeof handleProgressingChapter>
>;

export type ProgressChapterErrorRes = ReturnType<
  typeof handleError<ProgressChapterSchema>
>;
