import { queryCacheKeys } from "@/lib/query-client";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { fetchCategories } from "../api/fetch-categories.api";

export const fetchCategoriesQueryOptions = infiniteQueryOptions({
  queryKey: queryCacheKeys.categories,
  queryFn: async () => {
    const res = await fetchCategories({});
    if ("error" in res) throw res;
    return res;
  },
  initialPageParam: undefined,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});
