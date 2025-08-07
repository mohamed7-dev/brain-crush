import { MutateOptions, useMutation } from "@tanstack/react-query";
import {
  updateCourse,
  UpdateCourseErrorRes,
  UpdateCourseSuccessRes,
} from "../api/update-course.api";
import { UpdateCourseSchema } from "../lib/schema";

type Input = UpdateCourseSchema;
type UseUpdateCourseSuccess = UpdateCourseSuccessRes;
type UseUpdateCourseError = UpdateCourseErrorRes;

export function useUpdateCourse(
  options?: MutateOptions<UseUpdateCourseSuccess, UseUpdateCourseError, Input>
) {
  return useMutation({
    mutationFn: async (input) => {
      const res = await updateCourse(input);
      if ("error" in res) throw res;
      return res;
    },
    ...options,
  });
}
