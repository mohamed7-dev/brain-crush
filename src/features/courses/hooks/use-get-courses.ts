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
    queryKey: [...queryCacheKeys.courses, query ?? ""],
    queryFn: async ({
      pageParam,
    }: {
      pageParam?: GetCoursesSchema["cursor"];
    }) => {
      const searchParams = new URLSearchParams();
      if (pageParam) searchParams.set("cursor", JSON.stringify(pageParam));
      if (query) searchParams.set("query", query);
      const serverRes = await fetch(
        APIRoutes.getCourses(searchParams.toString())
      );
      if (!serverRes.ok)
        throw new Error("Something went wrong while fetching courses!");

      const res = (await serverRes.json()) as
        | FetchCoursesSuccessRes
        | FetchCoursesErrorRes;

      if ("error" in res) throw res;
      return res;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
