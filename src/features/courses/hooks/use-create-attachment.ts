import { MutateOptions, useMutation } from "@tanstack/react-query";
import { CreateAttachmentSchema } from "../lib/schema";
import {
  createAttachment,
  CreateAttachmentErrorRes,
  CreateAttachmentSuccessRes,
} from "../api/create-attachment.api";

type Input = CreateAttachmentSchema;
type UseCreateAttachmentSuccess = CreateAttachmentSuccessRes;
type UseCreateAttachmentError = CreateAttachmentErrorRes;

export function useCreateAttachment(
  options?: MutateOptions<
    UseCreateAttachmentSuccess,
    UseCreateAttachmentError,
    Input
  >
) {
  return useMutation({
    mutationFn: async (input) => {
      const res = await createAttachment(input);
      if ("error" in res) throw res;
      return res;
    },
    ...options,
  });
}
