"use client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryCacheKeys } from "@/lib/query-client";
import { APIRoutes } from "@/lib/routes";
import { GetCoursesSchema } from "../lib/schema";
import {
  FetchCoursesErrorRes,
  FetchCoursesSuccessRes,
} from "../api/fetch-courses.api";

export function useGetCourses({ query }: GetCoursesSchema) {
  return useSuspenseInfiniteQuery({
    queryKey: queryCacheKeys.courses,
    queryFn: async ({
      pageParam,
    }: {
      pageParam?: GetCoursesSchema["cursor"];
    }) => {
      let res;
      const serverRes = await fetch(
        APIRoutes.getCourses(
          `${!!pageParam ? "cursor=" + JSON.stringify(pageParam) : ""}${
            !!query ? "&query=" + query : ""
          }`
        )
      );
      if (!serverRes.ok)
        throw new Error("Something went wrong while fetching courses!");

      res = (await serverRes.json()) as
        | FetchCoursesSuccessRes
        | FetchCoursesErrorRes;

      if ("error" in res) throw res;
      return res;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
