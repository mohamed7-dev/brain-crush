import { useMutation, MutationOptions } from "@tanstack/react-query";
import { DeleteChapterSchema } from "../lib/schema";
import {
  deleteChapter,
  DeleteChapterErrorRes,
  DeleteChapterSuccessRes,
} from "../api/delete-chapter.api";

type Input = DeleteChapterSchema;
type UseDeleteChapterSuccess = DeleteChapterSuccessRes;
type UseDeleteChapterError = DeleteChapterErrorRes;

export function useDeleteChapter(
  options?: Omit<
    MutationOptions<UseDeleteChapterSuccess, UseDeleteChapterError, Input>,
    "mutationFn" | "mutationKey"
  >
) {
  return useMutation({
    mutationFn: async (input) => {
      const res = await deleteChapter(input);
      if ("error" in res) throw res;
      return res;
    },
    ...options,
  });
}
