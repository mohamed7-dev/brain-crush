"use server";

import { handleError, ValidationException } from "@/lib/exceptions";
import {
  updateChapterVideoSchema,
  UpdateChapterVideoSchema,
} from "../lib/schema";
import z from "zod";
import { SuccessMutateRes } from "@/lib/type-utils";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";
import { updateChapterVideoService } from "../services/update-chapter-video.service";

async function handleUpdatingChapterVideo(input: UpdateChapterVideoSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = updateChapterVideoSchema.safeParse(input);
  console.log(error);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const updatedChapter = await updateChapterVideoService(parsedData);
  revalidatePath(
    routes.teacherCourseChapter(parsedData.courseId, parsedData.id)
  );
  return {
    success: true,
    statusCode: 200,
    message: "Course chapter video has been updated successfully.",
    data: updatedChapter,
  } satisfies SuccessMutateRes<typeof updatedChapter>;
}

export async function updateChapterVideo(input: UpdateChapterVideoSchema) {
  try {
    return await handleUpdatingChapterVideo(input);
  } catch (error) {
    return handleError(error);
  }
}
export type UpdateChapterVideoSuccessRes = Awaited<
  ReturnType<typeof handleUpdatingChapterVideo>
>;

export type UpdateChapterVideoErrorRes = ReturnType<
  typeof handleError<UpdateChapterVideoSchema>
>;
