import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";

type NotFoundPlaceholderProps = {
  message: string;
  path?: string;
  buttonLabel?: string;
  Content?: React.ReactNode;
};
export function NotFoundPlaceholder({
  message,
  path,
  buttonLabel,
  Content,
}: NotFoundPlaceholderProps) {
  return (
    <Stack sx={{ alignItems: "center", gap: 1 }}>
      <PriorityHighOutlinedIcon fontSize={"large"} color="warning" />
      <Typography component={"p"} variant="h3">
        {message}
      </Typography>
      {!Content && path && <Button href={path}>{buttonLabel}</Button>}
      {Content}
    </Stack>
  );
}
