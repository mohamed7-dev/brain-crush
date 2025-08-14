import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { FetchCoursesAnalyticsSuccessRes } from "../../api/fetch-courses-analytics.api";

type AnalyticsStatsSectionProps = {
  stats: FetchCoursesAnalyticsSuccessRes["data"];
};
export function AnalyticsStatsSection({ stats }: AnalyticsStatsSectionProps) {
  return (
    <Grid container spacing={2}>
      {/* Total Revenue Card */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
          <CardContent>
            <Typography variant="subtitle2">Total Revenue</Typography>
            <Typography variant="h5" fontWeight="bold">
              ${stats.totalRevenue.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Sales Card */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
          <CardContent>
            <Typography variant="subtitle2">Total Sales</Typography>
            <Typography variant="h5" fontWeight="bold">
              {stats.totalSales.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
