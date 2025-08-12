import { HomePageView } from "@/features/courses/components/views/home-page-view";
import { browseCoursesQueryOptions } from "@/features/courses/lib/prefetch";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function HomePage() {
  const qClient = getQueryClient();
  void qClient.prefetchInfiniteQuery(browseCoursesQueryOptions);
  return (
    <HydrationBoundary state={dehydrate(qClient)}>
      <HomePageView />
    </HydrationBoundary>
  );
}
