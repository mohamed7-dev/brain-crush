import "server-only";
import { handleError } from "@/lib/exceptions";
import { SuccessFindRes } from "../../../lib/type-utils";
import { getCoursesAnalyticsService } from "../services/get-courses-analytics.service";

async function handleFetchingCoursesAnalytics() {
  const data = await getCoursesAnalyticsService();
  return {
    success: true,
    statusCode: 200,
    data: data,
    total: 1,
    nextCursor: undefined,
  } satisfies SuccessFindRes<typeof data>;
}

export async function fetchCoursesAnalytics() {
  try {
    return await handleFetchingCoursesAnalytics();
  } catch (error) {
    return handleError(error);
  }
}

export type FetchCoursesAnalyticsSuccessRes = Awaited<
  ReturnType<typeof handleFetchingCoursesAnalytics>
>;

export type FetchCoursesAnalyticsErrorRes = ReturnType<typeof handleError>;
