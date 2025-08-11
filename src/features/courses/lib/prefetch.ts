import { queryCacheKeys } from "@/lib/query-client";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { fetchCourses } from "../api/fetch-courses.api";

export const fetchCoursesQueryOptions = infiniteQueryOptions({
  queryKey: queryCacheKeys.courses,
  queryFn: async () => {
    const res = await fetchCourses({});
    if ("error" in res) throw res;
    return res;
  },
  initialPageParam: undefined,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});
