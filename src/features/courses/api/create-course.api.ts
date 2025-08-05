"use server";
import z from "zod";
import { handleError, ValidationException } from "@/lib/exceptions";
import { createCourseSchema, CreateCourseSchema } from "../lib/schema";
import { createCourseService } from "../services/create-course.service";
import { SuccessMutateRes } from "../lib/type-utils";

async function handleCreatingCourse(input: CreateCourseSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = createCourseSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const newCourse = await createCourseService(parsedData);
  return {
    success: true,
    statusCode: 201,
    message: "Course has been created successfully.",
    data: newCourse,
  } satisfies SuccessMutateRes<typeof newCourse>;
}

export async function createCourse(input: CreateCourseSchema) {
  try {
    return await handleCreatingCourse(input);
  } catch (error) {
    return handleError(error);
  }
}

export type CreateCourseSuccessRes = Awaited<
  ReturnType<typeof handleCreatingCourse>
>;

export type CreateCourseErrorRes = ReturnType<
  typeof handleError<CreateCourseSchema>
>;
