import React from "react";
import { red } from "@/lib/theme/primitives";
import { useColorScheme } from "@mui/material";
import Typography, { TypographyProps } from "@mui/material/Typography";

type RequiredSuperscriptProps = Omit<TypographyProps, "component">;
export function RequiredSuperscript({
  sx,
  fontSize,
  children,
  ...props
}: RequiredSuperscriptProps) {
  const { colorScheme } = useColorScheme();
  return (
    <Typography
      component={"sup"}
      sx={{
        color: colorScheme === "dark" ? red[200] : red[400],
        ...sx,
      }}
      fontSize={fontSize ?? 14}
      {...props}
    >
      {children ?? "*"}
    </Typography>
  );
}
