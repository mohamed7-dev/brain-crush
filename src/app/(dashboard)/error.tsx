"use client";

import { routes } from "@/lib/routes";
import { ErrorOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";

export default function DashboardLayoutError({ error }: { error: Error }) {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        gap: 2,
      }}
    >
      <ErrorOutlined color="error" fontSize={"large"} />
      <Typography component={"h1"} variant="h2">
        {error.name}
      </Typography>
      <Typography component={"p"} variant="h4">
        {error.message}
      </Typography>
      <Stack direction={"row"} sx={{ alignItems: "center", gap: 1 }}>
        <Button href={routes.home} variant="outlined">
          Go Home
        </Button>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Reload
        </Button>
      </Stack>
    </Stack>
  );
}
