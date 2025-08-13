import "server-only";
import { handleError, ValidationException } from "@/lib/exceptions";
import {
  getStudentChapterSchema,
  GetStudentChapterSchema,
} from "../lib/schema";
import z from "zod";
import { SuccessFindRes } from "@/lib/type-utils";
import { getStudentChapterService } from "../services/get-student-chapter.service";

async function handleFetchingStudentChapter(input: GetStudentChapterSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = getStudentChapterSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const foundChapter = await getStudentChapterService(parsedData);
  return {
    success: true,
    statusCode: 200,
    data: foundChapter,
    total: 1,
    nextCursor: undefined,
  } satisfies SuccessFindRes<typeof foundChapter>;
}

export async function fetchStudentChapter(input: GetStudentChapterSchema) {
  try {
    return await handleFetchingStudentChapter(input);
  } catch (error) {
    return handleError(error);
  }
}

export type FetchStudentChapterSuccessRes = Awaited<
  ReturnType<typeof handleFetchingStudentChapter>
>;

export type FetchStudentChapterErrorRes = ReturnType<
  typeof handleError<GetStudentChapterSchema>
>;
