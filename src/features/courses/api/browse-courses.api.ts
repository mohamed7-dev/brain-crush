import "server-only";
import { handleError, ValidationException } from "@/lib/exceptions";
import { SuccessFindRes } from "../../../lib/type-utils";
import z from "zod";
import { browseCoursesSchema, BrowseCoursesSchema } from "../lib/schema";
import { browseCoursesService } from "../services/browse-courses.service";

async function handleBrowsingCourses(input: BrowseCoursesSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = browseCoursesSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const foundCourses = await browseCoursesService(parsedData);
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

export async function browseCourses(input: BrowseCoursesSchema) {
  try {
    return await handleBrowsingCourses(input);
  } catch (error) {
    return handleError(error);
  }
}

export type BrowseCoursesSuccessRes = Awaited<
  ReturnType<typeof handleBrowsingCourses>
>;

export type BrowseCoursesErrorRes = ReturnType<
  typeof handleError<BrowseCoursesSchema>
>;
