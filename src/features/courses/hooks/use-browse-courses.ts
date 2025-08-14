"use client";
import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { queryCacheKeys } from "@/lib/query-client";
import { APIRoutes } from "@/lib/routes";
import { BrowseCoursesSchema } from "../lib/schema";
import {
  BrowseCoursesErrorRes,
  BrowseCoursesSuccessRes,
} from "../api/browse-courses.api";

const getQueryOptions = ({ query }: Pick<BrowseCoursesSchema, "query">) => {
  return infiniteQueryOptions({
    queryKey: [...queryCacheKeys.browseCourses, query ?? ""],
    queryFn: async ({
      pageParam,
    }: {
      pageParam?: BrowseCoursesSchema["cursor"];
    }) => {
      let res;
      const serverRes = await fetch(
        APIRoutes.browseCourses(
          `${!!pageParam ? "cursor=" + JSON.stringify(pageParam) : ""}${
            !!query ? (!!pageParam ? "&" : "" + "query=" + query) : ""
          }`
        )
      );
      if (!serverRes.ok) {
        throw new Error("Something went wrong while fetching courses!");
      }

      res = (await serverRes.json()) as
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
  variant,
}: Pick<BrowseCoursesSchema, "query"> & {
  variant: "Search" | "View";
}) {
  if (variant === "View") {
    return useSuspenseInfiniteQuery({
      ...getQueryOptions({ query }),
    });
  } else {
    return useInfiniteQuery({
      ...getQueryOptions({ query }),
      enabled: !!query && query?.length > 0,
    });
  }
}
