import React from "react";
import { SearchResultsPageView } from "@/features/courses/components/views/search-results-page-view";
import { getSearchPageMetadata } from "@/config/app.config";

export async function generateMetadata({
  searchParams,
}: SearchResultsPageProps) {
  const q = (await searchParams).q;
  return getSearchPageMetadata(q);
}

type SearchResultsPageProps = {
  searchParams: Promise<{ q: string; categoryId: string }>;
};

export default async function SearchResultsPage() {
  return <SearchResultsPageView />;
}
