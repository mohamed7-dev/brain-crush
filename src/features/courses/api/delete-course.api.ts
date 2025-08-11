"use server";
import { handleError, ValidationException } from "@/lib/exceptions";
import z from "zod";
import { SuccessMutateRes } from "@/lib/type-utils";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";
import { deleteCourseSchema, DeleteCourseSchema } from "../lib/schema";
import { deleteCourseService } from "../services/delete-course.service";

async function handleDeletingCourse(input: DeleteCourseSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = deleteCourseSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const deletionResult = await deleteCourseService(parsedData);
  revalidatePath(routes.teacherCourse(parsedData.courseId));
  return {
    success: true,
    statusCode: 200,
    message: "Course has been deleted successfully.",
    data: deletionResult,
  } satisfies SuccessMutateRes<typeof deletionResult>;
}

export async function deleteCourse(input: DeleteCourseSchema) {
  try {
    return await handleDeletingCourse(input);
  } catch (error) {
    return handleError(error);
  }
}
export type DeleteCourseSuccessRes = Awaited<
  ReturnType<typeof handleDeletingCourse>
>;

export type DeleteCourseErrorRes = ReturnType<
  typeof handleError<DeleteCourseSchema>
>;
