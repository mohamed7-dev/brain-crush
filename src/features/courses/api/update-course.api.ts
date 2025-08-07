"use server";
import z from "zod";
import { handleError, ValidationException } from "@/lib/exceptions";
import { updateCourseSchema, UpdateCourseSchema } from "../lib/schema";
import { SuccessMutateRes } from "../../../lib/type-utils";
import { updateCourseService } from "../services/update-course.service";
import { revalidateTag } from "next/cache";

async function handleUpdatingCourse(input: UpdateCourseSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = updateCourseSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const updatedCourse = await updateCourseService(parsedData);
  revalidateTag("course");
  return {
    success: true,
    statusCode: 200,
    message: "Course has been updated successfully.",
    data: updatedCourse,
  } satisfies SuccessMutateRes<typeof updatedCourse>;
}

export async function updateCourse(input: UpdateCourseSchema) {
  try {
    return await handleUpdatingCourse(input);
  } catch (error) {
    return handleError(error);
  }
}

export type UpdateCourseSuccessRes = Awaited<
  ReturnType<typeof handleUpdatingCourse>
>;

export type UpdateCourseErrorRes = ReturnType<
  typeof handleError<UpdateCourseSchema>
>;
