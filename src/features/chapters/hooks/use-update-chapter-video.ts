import { useMutation, MutationOptions } from "@tanstack/react-query";
import { UpdateChapterVideoSchema } from "../lib/schema";
import {
  UpdateChapterVideoSuccessRes,
  UpdateChapterVideoErrorRes,
  updateChapterVideo,
} from "../api/update-chapter-video.api";

type Input = UpdateChapterVideoSchema;
type UseUpdateChapterVideoSuccess = UpdateChapterVideoSuccessRes;
type UseUpdateChapterVideoError = UpdateChapterVideoErrorRes;

export function useUpdateChapterVideo(
  options?: Omit<
    MutationOptions<
      UseUpdateChapterVideoSuccess,
      UseUpdateChapterVideoError,
      Input
    >,
    "mutationFn" | "mutationKey"
  >
) {
  return useMutation({
    mutationFn: async (input) => {
      const res = await updateChapterVideo(input);
      if ("error" in res) throw res;
      return res;
    },
    ...options,
  });
}
