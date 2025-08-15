import React from "react";
import Stack from "@mui/material/Stack";
import { SearchResultsSection } from "../sections/search-results-section";

export function SearchResultsPageView() {
  return (
    <Stack sx={{ p: { md: 6, xs: 2 } }}>
      <React.Suspense fallback={<>Loading...</>}>
        <SearchResultsSection />
      </React.Suspense>
    </Stack>
  );
}
