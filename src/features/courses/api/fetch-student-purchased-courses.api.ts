import "server-only";
import { handleError, ValidationException } from "@/lib/exceptions";
import { SuccessFindRes } from "../../../lib/type-utils";
import z from "zod";
import { getCoursesSchema, GetCoursesSchema } from "../lib/schema";
import { getStudentPurchasedCoursesService } from "../services/get-student-purchased-courses.service";

async function handleFetchingStudentPurchasedCourses(input: GetCoursesSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = getCoursesSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const foundCourses = await getStudentPurchasedCoursesService(parsedData);
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

export async function fetchStudentPurchasedCourses(input: GetCoursesSchema) {
  try {
    return await handleFetchingStudentPurchasedCourses(input);
  } catch (error) {
    return handleError(error);
  }
}

export type FetchStudentPurchasedCoursesSuccessRes = Awaited<
  ReturnType<typeof handleFetchingStudentPurchasedCourses>
>;

export type FetchStudentPurchasedCoursesErrorRes = ReturnType<
  typeof handleError<GetCoursesSchema>
>;
