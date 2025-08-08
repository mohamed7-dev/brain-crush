import "server-only";
import { handleError, ValidationException } from "@/lib/exceptions";
import { getChapterSchema, GetChapterSchema } from "../lib/schema";
import z from "zod";
import { getChapterService } from "../services/get-chapter.service";
import { SuccessFindRes } from "@/lib/type-utils";
import { unstable_cache } from "next/cache";
import { userOnly } from "@/features/me/lib/authorization";

async function handleFetchingChapter(input: GetChapterSchema) {
  await userOnly();
  const {
    success,
    error,
    data: parsedData,
  } = getChapterSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const foundChapter = await getChapterService(parsedData);
  return {
    success: true,
    statusCode: 200,
    data: foundChapter,
    total: 1,
    nextCursor: undefined,
  } satisfies SuccessFindRes<typeof foundChapter>;
}

export async function fetchChapter(input: GetChapterSchema) {
  try {
    return await handleFetchingChapter(input);
  } catch (error) {
    return handleError(error);
  }
}

export type FetchChapterSuccessRes = Awaited<
  ReturnType<typeof handleFetchingChapter>
>;

export type FetchChapterErrorRes = ReturnType<
  typeof handleError<GetChapterSchema>
>;
