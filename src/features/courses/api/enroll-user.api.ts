"use server";
import { handleError, ValidationException } from "@/lib/exceptions";
import z from "zod";
import { SuccessMutateRes } from "@/lib/type-utils";
import { enrollUserSchema, EnrollUserSchema } from "../lib/schema";
import { enrollUserService } from "../services/enroll-user.service";

async function handleEnrollingUser(input: EnrollUserSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = enrollUserSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));
  const data = await enrollUserService(parsedData);
  return {
    success: true,
    statusCode: 200,
    message: "User enrollment session has been started.",
    data,
  } satisfies SuccessMutateRes<typeof data>;
}

export async function enrollUser(input: EnrollUserSchema) {
  try {
    return await handleEnrollingUser(input);
  } catch (error) {
    return handleError(error);
  }
}
export type EnrollUserSuccessRes = Awaited<
  ReturnType<typeof handleEnrollingUser>
>;

export type EnrollUserErrorRes = ReturnType<
  typeof handleError<EnrollUserSchema>
>;
