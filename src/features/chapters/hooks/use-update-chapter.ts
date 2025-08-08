import { useMutation, MutationOptions } from "@tanstack/react-query";
import {
  updateChapter,
  UpdateChapterErrorRes,
  UpdateChapterSuccessRes,
} from "../api/update-chapter.api";
import { UpdateChapterSchema } from "../lib/schema";

type Input = UpdateChapterSchema;
type UseUpdateChapterSuccess = UpdateChapterSuccessRes;
type UseUpdateChapterError = UpdateChapterErrorRes;

export function useUpdateChapter(
  options?: Omit<
    MutationOptions<UseUpdateChapterSuccess, UseUpdateChapterError, Input>,
    "mutationFn" | "mutationKey"
  >
) {
  return useMutation({
    mutationFn: async (input) => {
      const res = await updateChapter(input);
      if ("error" in res) throw res;
      return res;
    },
    ...options,
  });
}
