import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { HomePageCoursesSection } from "../sections/home-page-courses-section";

export function HomePageView() {
  return (
    <Stack sx={{ p: 6, gap: 6 }}>
      <Box>Categories Carousel</Box>
      <HomePageCoursesSection />
    </Stack>
  );
}
