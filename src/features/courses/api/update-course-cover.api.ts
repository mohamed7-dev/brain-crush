"use server";

import { handleError, ValidationException } from "@/lib/exceptions";

import z from "zod";
import { SuccessMutateRes } from "@/lib/type-utils";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";
import {
  updateCourseCoverSchema,
  UpdateCourseCoverSchema,
} from "../lib/schema";
import { updateCourseCoverService } from "../services/update-course-cover.service";

async function handleUpdatingCourseCover(input: UpdateCourseCoverSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = updateCourseCoverSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const updatedCourse = await updateCourseCoverService(parsedData);
  revalidatePath(routes.teacherCourse(parsedData.courseId));
  return {
    success: true,
    statusCode: 200,
    message: "Course cover image has been updated successfully.",
    data: updatedCourse,
  } satisfies SuccessMutateRes<typeof updatedCourse>;
}

export async function updateCourseCover(input: UpdateCourseCoverSchema) {
  try {
    return await handleUpdatingCourseCover(input);
  } catch (error) {
    return handleError(error);
  }
}
export type UpdateCourseCoverSuccessRes = Awaited<
  ReturnType<typeof handleUpdatingCourseCover>
>;

export type UpdateCourseCoverErrorRes = ReturnType<
  typeof handleError<UpdateCourseCoverSchema>
>;
