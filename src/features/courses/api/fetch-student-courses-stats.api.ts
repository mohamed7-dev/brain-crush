import "server-only";
import { handleError } from "@/lib/exceptions";
import { SuccessFindRes } from "../../../lib/type-utils";
import { getStudentCoursesStatsService } from "../services/get-student-courses-stats.service";

async function handleFetchingStudentCoursesStats() {
  const stats = await getStudentCoursesStatsService();
  return {
    success: true,
    statusCode: 200,
    data: stats,
    total: stats.length,
    nextCursor: undefined,
  } satisfies SuccessFindRes<typeof stats>;
}

export async function fetchStudentCoursesStats() {
  try {
    return await handleFetchingStudentCoursesStats();
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
}

export type FetchStudentCoursesStatsSuccessRes = Awaited<
  ReturnType<typeof handleFetchingStudentCoursesStats>
>;

export type FetchStudentCoursesStatsErrorRes = ReturnType<typeof handleError>;
