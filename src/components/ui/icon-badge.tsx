"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { SvgIconComponent } from "@mui/icons-material";

export const variantColors = {
  default: {
    bg: "#e0f2fe",
    color: "#0369a1",
  },
  success: {
    bg: "#d1fae5",
    color: "#065f46",
  },
} as const;

export const sizeValues = {
  default: {
    padding: 8,
    iconSize: 32,
  },
  sm: {
    padding: 4,
    iconSize: 16,
  },
} as const;

type Variant = keyof typeof variantColors;
type Size = keyof typeof sizeValues;

const Root = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant" && prop !== "size",
})<{
  variant: Variant;
  size: Size;
}>(({ variant, size }) => {
  const color = variantColors[variant];
  const sizeVal = sizeValues[size];

  return {
    backgroundColor: color.bg,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: sizeVal.padding,
    width: "fit-content",
  };
});

interface IconBadgeProps {
  icon: SvgIconComponent;
  variant?: Variant;
  size?: Size;
}
export function IconBadge({
  icon: Icon,
  variant = "default",
  size = "default",
}: IconBadgeProps) {
  const iconColor = variantColors[variant].color;
  const iconSize = sizeValues[size].iconSize;

  return (
    <Root variant={variant} size={size}>
      <Icon style={{ color: iconColor, width: iconSize, height: iconSize }} />
    </Root>
  );
}
