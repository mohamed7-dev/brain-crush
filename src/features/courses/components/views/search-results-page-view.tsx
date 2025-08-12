import React from "react";
import Stack from "@mui/material/Stack";
import { SearchResultsSection } from "../sections/search-results-section";

export function SearchResultsPageView() {
  return (
    <Stack>
      <>Categories carousel</>
      <React.Suspense fallback={<>Loading...</>}>
        <SearchResultsSection />
      </React.Suspense>
    </Stack>
  );
}
