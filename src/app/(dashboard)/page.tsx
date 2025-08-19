import { HOME_PAGE_METADATA } from "@/config/app.config";
import { HomePageView } from "@/features/courses/components/views/home-page-view";
import { browseCoursesQueryOptions } from "@/features/courses/lib/prefetch";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = HOME_PAGE_METADATA;

export default async function HomePage() {
  const qClient = getQueryClient();
  void qClient.prefetchInfiniteQuery(browseCoursesQueryOptions());
  return (
    <HydrationBoundary state={dehydrate(qClient)}>
      <HomePageView />
    </HydrationBoundary>
  );
}
