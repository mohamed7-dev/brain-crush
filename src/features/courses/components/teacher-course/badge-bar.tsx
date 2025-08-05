import React from "react";
import { IconBadge } from "@/components/ui/icon-badge";
import { DashboardOutlined } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function BadgeBar() {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center", gap: 2 }}>
      <IconBadge icon={DashboardOutlined} />
      <Typography component={"h2"} variant="h6">
        Customize your course
      </Typography>
    </Stack>
  );
}
