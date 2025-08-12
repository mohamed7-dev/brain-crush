import React from "react";
import { SearchResultsPageView } from "@/features/courses/components/views/search-results-page-view";

type SearchResultsPageProps = {
  searchParams: Promise<{ q: string; categoryId: string }>;
};
export default async function SearchResultsPage({
  searchParams,
}: SearchResultsPageProps) {
  const params = await searchParams;

  return <SearchResultsPageView />;
}
