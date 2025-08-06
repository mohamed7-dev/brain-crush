"use client";
import { queryCacheKeys } from "@/lib/query-client";
import { APIRoutes } from "@/lib/routes";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  FetchCategoriesErrorRes,
  FetchCategoriesSuccessRes,
} from "../api/fetch-categories.api";

export function useQueryCategories(query?: string) {
  return useInfiniteQuery({
    queryKey: queryCacheKeys.categories,
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const res = await fetch(
        APIRoutes.getCategories(
          `${!!pageParam ? "page=" + pageParam : ""}${
            !!query ? "&query=" + query : ""
          }`
        )
      );
      if (!res.ok)
        throw new Error("Something went wrong while fetching categories!");

      const data = (await res.json()) as
        | FetchCategoriesErrorRes
        | FetchCategoriesSuccessRes;

      if ("error" in data) throw res;
      return data;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
