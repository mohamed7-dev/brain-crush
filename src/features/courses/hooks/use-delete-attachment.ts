import { MutateOptions, useMutation } from "@tanstack/react-query";
import { DeleteAttachmentSchema } from "../lib/schema";
import {
  deleteAttachment,
  DeleteAttachmentErrorRes,
  DeleteAttachmentSuccessRes,
} from "../api/delete-attachment.api";

type Input = DeleteAttachmentSchema;
type UseDeleteAttachmentSuccess = DeleteAttachmentSuccessRes;
type UseDeleteAttachmentError = DeleteAttachmentErrorRes;

export function useDeleteAttachment(
  options?: MutateOptions<
    UseDeleteAttachmentSuccess,
    UseDeleteAttachmentError,
    Input
  >
) {
  return useMutation({
    mutationFn: async (input) => {
      const res = await deleteAttachment(input);
      if ("error" in res) throw res;
      return res;
    },
    ...options,
  });
}
