import { queryCacheKeys } from "@/lib/query-client";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { fetchCourses } from "../api/fetch-courses.api";
import { browseCourses } from "../api/browse-courses.api";
import { fetchStudentPurchasedCourses } from "../api/fetch-student-purchased-courses.api";

export const fetchCoursesQueryOptions = (query?: string) =>
  infiniteQueryOptions({
    queryKey: [...queryCacheKeys.courses, query ?? ""],
    queryFn: async () => {
      const res = await fetchCourses({});
      if ("error" in res) throw res;
      return res;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export const browseCoursesQueryOptions = (q?: string, categoryId?: string) =>
  infiniteQueryOptions({
    queryKey: [...queryCacheKeys.browseCourses, q ?? "", categoryId ?? ""],
    queryFn: async () => {
      const res = await browseCourses({ query: q ?? undefined });
      if ("error" in res) throw res;
      return res;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

export const getStudentPurchasedCoursesQueryOptions = infiniteQueryOptions({
  queryKey: queryCacheKeys.studentPurchasedCourses,
  queryFn: async () => {
    const res = await fetchStudentPurchasedCourses({});
    if ("error" in res) throw res;
    return res;
  },
  initialPageParam: undefined,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});
