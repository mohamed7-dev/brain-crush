import { red } from "@/lib/theme/primitives";
import { colors, useColorScheme, useTheme } from "@mui/material";
import Typography, { TypographyProps } from "@mui/material/Typography";
import React from "react";

type RequiredSuperscriptProps = TypographyProps;
export function RequiredSuperscript({
  sx,
  fontSize,
  component,
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
