"use client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
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
      const searchParams = new URLSearchParams();
      if (pageParam) searchParams.set("cursor", JSON.stringify(pageParam));
      if (query) searchParams.set("query", query);
      const serverRes = await fetch(
        APIRoutes.getCategories(searchParams.toString())
      );
      if (!serverRes.ok)
        throw new Error("Something went wrong while fetching categories!");

      const res = (await serverRes.json()) as
        | FetchCategoriesErrorRes
        | FetchCategoriesSuccessRes;

      if ("error" in res) throw res;
      return res;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
