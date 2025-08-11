import "server-only";
import { handleError, ValidationException } from "@/lib/exceptions";
import { SuccessFindRes } from "../../../lib/type-utils";
import z from "zod";
import { getCoursesService } from "../services/get-courses.service";
import { getCoursesSchema, GetCoursesSchema } from "../lib/schema";

async function handleFetchingCourses(input: GetCoursesSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = getCoursesSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const foundCourses = await getCoursesService(parsedData);
  return {
    success: true,
    statusCode: 200,
    data: foundCourses.data,
    total: foundCourses.total,
    nextCursor: foundCourses.nextCursor,
  } satisfies SuccessFindRes<
    typeof foundCourses.data,
    typeof foundCourses.nextCursor
  >;
}

export async function fetchCourses(input: GetCoursesSchema) {
  try {
    return await handleFetchingCourses(input);
  } catch (error) {
    return handleError(error);
  }
}

export type FetchCoursesSuccessRes = Awaited<
  ReturnType<typeof handleFetchingCourses>
>;

export type FetchCoursesErrorRes = ReturnType<
  typeof handleError<GetCoursesSchema>
>;
