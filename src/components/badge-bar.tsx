import React from "react";
import { IconBadge } from "@/components/ui/icon-badge";
import { SvgIconComponent } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type BadgeBarProps = {
  icon: SvgIconComponent;
  label: string;
};

export function BadgeBar({ icon, label }: BadgeBarProps) {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center", gap: 2 }}>
      <IconBadge icon={icon} />
      <Typography component={"h2"} variant="h6">
        {label}
      </Typography>
    </Stack>
  );
}
