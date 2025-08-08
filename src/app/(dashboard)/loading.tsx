import React from "react";
import { CircularProgress, Stack } from "@mui/material";

export default function DashboardLayoutLoading() {
  return (
    <Stack
      direction={"row"}
      sx={{ alignItems: "center", justifyContent: "center", height: "50vh" }}
    >
      <CircularProgress size={40} />
    </Stack>
  );
}
