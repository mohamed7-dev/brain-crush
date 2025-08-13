import { MutateOptions, useMutation } from "@tanstack/react-query";
import { EnrollUserSchema } from "../lib/schema";
import {
  enrollUser,
  EnrollUserErrorRes,
  EnrollUserSuccessRes,
} from "../api/enroll-user.api";

type Input = EnrollUserSchema;
type UseEnrollUserSuccess = EnrollUserSuccessRes;
type UseEnrollUserError = EnrollUserErrorRes;

export function useEnrollUser(
  options?: MutateOptions<UseEnrollUserSuccess, UseEnrollUserError, Input>
) {
  return useMutation({
    mutationFn: async (input) => {
      const res = await enrollUser(input);
      if ("error" in res) throw res;
      return res;
    },
    ...options,
  });
}
