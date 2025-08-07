"use server";
import { handleError, ValidationException } from "@/lib/exceptions";
import { createChapterSchema, CreateChapterSchema } from "../lib/schema";
import z from "zod";
import { createChapterService } from "../services/create-chapter.service";
import { SuccessMutateRes } from "@/lib/type-utils";
import { revalidateTag } from "next/cache";

async function handleCreatingChapter(input: CreateChapterSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = createChapterSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const newChapter = await createChapterService(parsedData);
  revalidateTag("course");
  return {
    success: true,
    statusCode: 200,
    message: "Course chapter has been created successfully.",
    data: newChapter,
  } satisfies SuccessMutateRes<typeof newChapter>;
}

export async function createChapter(input: CreateChapterSchema) {
  try {
    return await handleCreatingChapter(input);
  } catch (error) {
    return handleError(error);
  }
}
export type CreateChapterSuccessRes = Awaited<
  ReturnType<typeof handleCreatingChapter>
>;

export type CreateChapterErrorRes = ReturnType<
  typeof handleError<CreateChapterSchema>
>;
