import React from "react";
import Stack from "@mui/material/Stack";
import { HomePageCoursesSection } from "../sections/home-page-courses-section";

export function HomePageView() {
  return (
    <Stack sx={{ p: { md: 6, xs: 1 } }}>
      <React.Suspense>
        <HomePageCoursesSection />
      </React.Suspense>
    </Stack>
  );
}
