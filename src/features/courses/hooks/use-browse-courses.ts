"use client";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { queryCacheKeys } from "@/lib/query-client";
import { APIRoutes } from "@/lib/routes";
import { BrowseCoursesSchema } from "../lib/schema";
import {
  BrowseCoursesErrorRes,
  BrowseCoursesSuccessRes,
} from "../api/browse-courses.api";

const getQueryOptions = ({
  query,
  categoryId,
}: Pick<BrowseCoursesSchema, "query" | "categoryId">) => {
  return infiniteQueryOptions({
    queryKey: [...queryCacheKeys.browseCourses, query ?? "", categoryId ?? ""],
    queryFn: async ({
      pageParam,
    }: {
      pageParam?: BrowseCoursesSchema["cursor"];
    }) => {
      const searchParams = new URLSearchParams();
      if (pageParam) searchParams.set("pageParam", JSON.stringify(pageParam));
      if (query) searchParams.set("query", query);
      if (categoryId) searchParams.set("categoryId", categoryId);
      const serverRes = await fetch(
        APIRoutes.browseCourses(searchParams.toString())
      );
      if (!serverRes.ok) {
        throw new Error("Something went wrong while fetching courses!");
      }

      const res = (await serverRes.json()) as
        | BrowseCoursesSuccessRes
        | BrowseCoursesErrorRes;

      if ("error" in res) throw res;
      return res;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export function useBrowseCourses({
  query,
  categoryId,
}: Pick<BrowseCoursesSchema, "query" | "categoryId"> & {
  variant: "Search" | "View";
}) {
  return useInfiniteQuery({
    ...getQueryOptions({ query, categoryId }),
    enabled: !!query || !!categoryId,
  });
}
