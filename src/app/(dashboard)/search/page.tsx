import React from "react";
import { SearchResultsPageView } from "@/features/courses/components/views/search-results-page-view";
import { getQueryClient } from "@/lib/query-client";
import { browseCoursesQueryOptions } from "@/features/courses/lib/prefetch";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type SearchResultsPageProps = {
  searchParams: Promise<{ q: string; categoryId: string }>;
};
export default async function SearchResultsPage({
  searchParams,
}: SearchResultsPageProps) {
  const { q, categoryId } = await searchParams;

  const qClient = getQueryClient();

  void qClient.prefetchInfiniteQuery(browseCoursesQueryOptions(q));

  return (
    <HydrationBoundary state={dehydrate(qClient)}>
      <SearchResultsPageView />
    </HydrationBoundary>
  );
}
