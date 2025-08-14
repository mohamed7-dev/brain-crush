import React from "react";
import { FetchCoursesAnalyticsSuccessRes } from "../../api/fetch-courses-analytics.api";
import { AnalyticsBarChartSection } from "../sections/analytics-bar-chart-section";
import { Stack } from "@mui/material";
import { AnalyticsStatsSection } from "../sections/analytics-stats-section";

type CoursesAnalyticsPageViewProps = {
  stats: FetchCoursesAnalyticsSuccessRes["data"];
};
export function CoursesAnalyticsPageView({
  stats,
}: CoursesAnalyticsPageViewProps) {
  return (
    <Stack sx={{ p: { xs: 1, md: 4 }, gap: 4 }}>
      <AnalyticsStatsSection stats={stats} />
      <AnalyticsBarChartSection stats={stats} />
    </Stack>
  );
}
