import "server-only";
import { handleError, ValidationException } from "@/lib/exceptions";
import { getCategoriesSchema, GetCategoriesSchema } from "../lib/schema";
import z from "zod";
import { getCategoriesService } from "../services/get-categories.service";
import { SuccessFindRes } from "@/lib/type-utils";

async function handleFetchingCategories(input: GetCategoriesSchema) {
  const {
    success,
    error,
    data: parsedData,
  } = getCategoriesSchema.safeParse(input);
  if (!success) throw new ValidationException(z.treeifyError(error));

  const data = await getCategoriesService(parsedData);
  return {
    success: true,
    statusCode: 200,
    data: data.data,
    nextCursor: data.nextCursor,
    total: data.total,
  } satisfies SuccessFindRes<typeof data.data, typeof data.nextCursor>;
}

export async function fetchCategories(input: GetCategoriesSchema) {
  try {
    return await handleFetchingCategories(input);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
}

export type FetchCategoriesSuccessRes = Awaited<
  ReturnType<typeof handleFetchingCategories>
>;

export type FetchCategoriesErrorRes = ReturnType<
  typeof handleError<GetCategoriesSchema>
>;
