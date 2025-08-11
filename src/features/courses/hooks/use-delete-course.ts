import { MutateOptions, useMutation } from "@tanstack/react-query";
import { DeleteCourseSchema } from "../lib/schema";
import {
  deleteCourse,
  DeleteCourseErrorRes,
  DeleteCourseSuccessRes,
} from "../api/delete-course.api";

type Input = DeleteCourseSchema;
type UseDeleteCourseSuccess = DeleteCourseSuccessRes;
type UseDeleteCourseError = DeleteCourseErrorRes;

export function useDeleteCourse(
  options?: MutateOptions<UseDeleteCourseSuccess, UseDeleteCourseError, Input>
) {
  return useMutation({
    mutationFn: async (input) => {
      const res = await deleteCourse(input);
      if ("error" in res) throw res;
      return res;
    },
    ...options,
  });
}
