"use client";
import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { queryCacheKeys } from "@/lib/query-client";
import { APIRoutes } from "@/lib/routes";
import {
  FetchCategoriesErrorRes,
  FetchCategoriesSuccessRes,
} from "../api/fetch-categories.api";

export function useQueryCategories(query?: string) {
  return useSuspenseInfiniteQuery({
    queryKey: queryCacheKeys.categories,
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      let res;
      const serverRes = await fetch(
        APIRoutes.getCategories(
          `${!!pageParam ? "page=" + pageParam : ""}${
            !!query ? "&query=" + query : ""
          }`
        )
      );
      if (!serverRes.ok)
        throw new Error("Something went wrong while fetching categories!");

      res = (await serverRes.json()) as
        | FetchCategoriesErrorRes
        | FetchCategoriesSuccessRes;

      if ("error" in res) throw res;
      return res;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
