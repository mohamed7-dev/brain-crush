"use client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryCacheKeys } from "@/lib/query-client";
import { APIRoutes } from "@/lib/routes";
import { GetCoursesSchema } from "../lib/schema";
import {
  FetchStudentPurchasedCoursesErrorRes,
  FetchStudentPurchasedCoursesSuccessRes,
} from "../api/fetch-student-purchased-courses.api";

export function useGetStudentPurchasedCourses({
  query,
}: Pick<GetCoursesSchema, "query">) {
  return useSuspenseInfiniteQuery({
    queryKey: queryCacheKeys.studentPurchasedCourses,
    queryFn: async ({
      pageParam,
    }: {
      pageParam?: GetCoursesSchema["cursor"];
    }) => {
      let res;
      const serverRes = await fetch(
        APIRoutes.getStudentPurchasedCourses(
          `${!!pageParam ? "cursor=" + JSON.stringify(pageParam) : ""}${
            !!query ? "&query=" + query : ""
          }`
        )
      );
      if (!serverRes.ok)
        throw new Error("Something went wrong while fetching courses!");

      res = (await serverRes.json()) as
        | FetchStudentPurchasedCoursesErrorRes
        | FetchStudentPurchasedCoursesSuccessRes;

      if ("error" in res) throw res;
      return res;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
