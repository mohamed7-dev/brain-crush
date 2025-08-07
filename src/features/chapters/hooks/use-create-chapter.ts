import { useMutation, MutationOptions } from "@tanstack/react-query";
import {
  createChapter,
  CreateChapterErrorRes,
  CreateChapterSuccessRes,
} from "../api/create-chapter.api";
import { CreateChapterSchema } from "../lib/schema";

type Input = CreateChapterSchema;
type UseCreateChapterSuccess = CreateChapterSuccessRes;
type UseCreateChapterError = CreateChapterErrorRes;

export function useCreateChapter(
  options?: Omit<
    MutationOptions<UseCreateChapterSuccess, UseCreateChapterError, Input>,
    "mutationFn" | "mutationKey"
  >
) {
  return useMutation({
    mutationFn: async (input) => {
      const res = await createChapter(input);
      if ("error" in res) throw res;
      return res;
    },
    ...options,
  });
}
