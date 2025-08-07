"use server";
import { handleError, ValidationException } from "@/lib/exceptions";
import { reorderChapterSchema, ReorderChapterSchema } from "../lib/schema";
import z from "zod";
import { SuccessMutateRes } from "@/lib/type-utils";
import { revalidateTag } from "next/cache";
import { reorderChapterService } from "../services/reorder-chapter.service";

async function handleReorderingChapter(input: ReorderChapterSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = reorderChapterSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const reorderedChapters = await reorderChapterService(parsedData);
  revalidateTag("course");
  return {
    success: true,
    statusCode: 200,
    message: "Course chapters have been reordered successfully.",
    data: reorderedChapters,
  } satisfies SuccessMutateRes<typeof reorderedChapters>;
}

export async function reorderChapter(input: ReorderChapterSchema) {
  try {
    return await handleReorderingChapter(input);
  } catch (error) {
    return handleError(error);
  }
}
export type ReorderChapterSuccessRes = Awaited<
  ReturnType<typeof handleReorderingChapter>
>;

export type ReorderChapterErrorRes = ReturnType<
  typeof handleError<ReorderChapterSchema>
>;
