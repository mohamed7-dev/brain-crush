import { MutateOptions, useMutation } from "@tanstack/react-query";
import { CreateCourseSchema } from "../lib/schema";
import {
  createCourse,
  CreateCourseErrorRes,
  CreateCourseSuccessRes,
} from "../api/create-course.api";

type Input = CreateCourseSchema;
type UseCreateCourseSuccess = CreateCourseSuccessRes;
type UseCreateCourseError = CreateCourseErrorRes;

export function useCreateCourse(
  options?: MutateOptions<UseCreateCourseSuccess, UseCreateCourseError, Input>
) {
  return useMutation({
    mutationFn: async (input) => {
      const res = await createCourse(input);
      if ("error" in res) throw res;
      return res;
    },
    ...options,
  });
}
