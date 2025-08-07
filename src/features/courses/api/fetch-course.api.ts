import { handleError, ValidationException } from "@/lib/exceptions";
import { SuccessFindRes } from "../../../lib/type-utils";
import { getCourseService } from "../services/get-course.service";
import z from "zod";
import { getCourseSchema, GetCourseSchema } from "../lib/schema";
import { unstable_cache } from "next/cache";

async function handleFetchingCourse(input: GetCourseSchema) {
  const { success, error, data: parsedData } = getCourseSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const foundCourse = await getCourseService(parsedData);
  return {
    success: true,
    statusCode: 200,
    data: foundCourse,
    total: 1,
    nextCursor: undefined,
  } satisfies SuccessFindRes<typeof foundCourse>;
}

export const fetchCourse = unstable_cache(
  async (input: GetCourseSchema) => {
    try {
      return await handleFetchingCourse(input);
    } catch (error) {
      return handleError(error);
    }
  },
  ["courses"],
  { tags: ["courses", "course"], revalidate: 3600 }
);

export type FetchCourseSuccessRes = Awaited<
  ReturnType<typeof handleFetchingCourse>
>;

export type FetchCourseErrorRes = ReturnType<
  typeof handleError<GetCourseSchema>
>;
