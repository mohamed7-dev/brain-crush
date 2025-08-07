import { useMutation, MutationOptions } from "@tanstack/react-query";
import { ReorderChapterSchema } from "../lib/schema";
import {
  reorderChapter,
  ReorderChapterErrorRes,
  ReorderChapterSuccessRes,
} from "../api/reorder-chapter.api";

type Input = ReorderChapterSchema;
type UseReorderChapterSuccess = ReorderChapterSuccessRes;
type UseReorderChapterError = ReorderChapterErrorRes;

export function useReorderChapter(
  options?: Omit<
    MutationOptions<UseReorderChapterSuccess, UseReorderChapterError, Input>,
    "mutationFn" | "mutationKey"
  >
) {
  return useMutation({
    mutationFn: async (input) => {
      const res = await reorderChapter(input);
      if ("error" in res) throw res;
      return res;
    },
    ...options,
  });
}
