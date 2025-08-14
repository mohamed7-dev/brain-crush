import React from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

type NoDataPlaceholderProps = {
  Icon?: SvgIconComponent;
  message: string;
  path?: string;
  buttonLabel?: string;
  Content?: React.ReactNode;
};
export function NoDataPlaceholder({
  Icon,
  message,
  path,
  buttonLabel,
  Content,
}: NoDataPlaceholderProps) {
  return (
    <Stack sx={{ alignItems: "center", gap: 1 }}>
      {Icon && <Icon fontSize={"large"} color="error" />}
      <Typography component={"p"} variant="h3">
        {message}
      </Typography>
      {!Content && path && <Button href={path}>{buttonLabel}</Button>}
      {Content}
    </Stack>
  );
}
