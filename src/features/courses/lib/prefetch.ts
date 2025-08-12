import { queryCacheKeys } from "@/lib/query-client";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { fetchCourses } from "../api/fetch-courses.api";
import { browseCourses } from "../api/browse-courses.api";
import { fetchStudentPurchasedCourses } from "../api/fetch-student-purchased-courses.api";

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

export const browseCoursesQueryOptions = infiniteQueryOptions({
  queryKey: queryCacheKeys.browseCourses,
  queryFn: async () => {
    const res = await browseCourses({});
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
