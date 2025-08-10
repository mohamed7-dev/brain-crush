import { MutateOptions, useMutation } from "@tanstack/react-query";
import {
  updateCourseCover,
  UpdateCourseCoverErrorRes,
  UpdateCourseCoverSuccessRes,
} from "../api/update-course-cover.api";
import { UpdateCourseCoverSchema } from "../lib/schema";

type Input = UpdateCourseCoverSchema;
type UseUpdateCourseCoverSuccess = UpdateCourseCoverSuccessRes;
type UseUpdateCourseCoverError = UpdateCourseCoverErrorRes;

export function useUpdateCourseCover(
  options?: MutateOptions<
    UseUpdateCourseCoverSuccess,
    UseUpdateCourseCoverError,
    Input
  >
) {
  return useMutation({
    mutationFn: async (input) => {
      const res = await updateCourseCover(input);
      if ("error" in res) throw res;
      return res;
    },
    ...options,
  });
}
