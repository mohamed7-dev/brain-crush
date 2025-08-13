import "server-only";
import { handleError, ValidationException } from "@/lib/exceptions";
import { SuccessFindRes } from "../../../lib/type-utils";
import z from "zod";
import { getCourseSchema, GetCourseSchema } from "../lib/schema";
import { getCourseChaptersService } from "../services/get-course-chapters.service";

async function handleFetchingCourseChapters(input: GetCourseSchema) {
  const { success, error, data: parsedData } = getCourseSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const foundCourse = await getCourseChaptersService(parsedData);
  return {
    success: true,
    statusCode: 200,
    data: foundCourse,
    total: 1,
    nextCursor: undefined,
  } satisfies SuccessFindRes<typeof foundCourse>;
}

export async function fetchCourseChapters(input: GetCourseSchema) {
  try {
    return await handleFetchingCourseChapters(input);
  } catch (error) {
    return handleError(error);
  }
}

export type FetchCourseChaptersSuccessRes = Awaited<
  ReturnType<typeof handleFetchingCourseChapters>
>;

export type FetchCourseChaptersErrorRes = ReturnType<
  typeof handleError<GetCourseSchema>
>;
