import { MutationOptions, useMutation } from "@tanstack/react-query";
import { ProgressChapterSchema } from "../lib/schema";
import {
  progressChapter,
  ProgressChapterErrorRes,
  ProgressChapterSuccessRes,
} from "../api/progress-chapter.api";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { routes } from "@/lib/routes";
import { FetchStudentChapterSuccessRes } from "../api/fetch-student-chapter.api";

type Input = ProgressChapterSchema;
type UseProgressChapterSuccess = ProgressChapterSuccessRes;
type UseProgressChapterError = ProgressChapterErrorRes;

export function useProgressChapter(
  chapter: FetchStudentChapterSuccessRes["data"],
  options?: Omit<
    MutationOptions<UseProgressChapterSuccess, UseProgressChapterError, Input>,
    "mutationFn" | "mutationKey" | "onSuccess" | "onError"
  >
) {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: async (input) => {
      const res = await progressChapter(input);
      if ("error" in res) throw res;
      return res;
    },
    onSuccess: (data) => {
      if (!chapter.nextChapter) {
        // TODO: open confetti
      }

      if (chapter.nextChapter) {
        router.push(
          routes.courseChapter(chapter.nextChapter.id, chapter.courseId)
        );
      }
      showSnackbar({ message: data.message, severity: "success" });
      router.refresh();
    },
    onError: (error) => {
      showSnackbar({ message: error.message, severity: "error" });
    },
    ...options,
  });
}
