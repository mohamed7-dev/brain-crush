import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";
import { FetchCoursesAnalyticsSuccessRes } from "../../api/fetch-courses-analytics.api";
import Box from "@mui/material/Box";
import { brand } from "@/lib/theme/primitives";

type AnalyticsBarChartSectionProps = {
  stats: FetchCoursesAnalyticsSuccessRes["data"];
};

export function AnalyticsBarChartSection({
  stats,
}: AnalyticsBarChartSectionProps) {
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box sx={{ minWidth: stats.data.length * 200 }}>
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: stats.data.map((item) => item.courseTitle),
            },
          ]}
          series={[
            {
              data: stats.data.map((item) => Number(item.purchaseCount)),
              label: "Purchases",
            },
          ]}
          height={400}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 1.5,
          }}
          colors={[brand[300]]}
        />
      </Box>
    </Box>
  );
}
