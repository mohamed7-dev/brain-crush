import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { ChevronLeftOutlined } from "@mui/icons-material";

type NavigationBarProps = ButtonProps;

export function NavigationBar(props: NavigationBarProps) {
  return (
    <Button startIcon={<ChevronLeftOutlined />} {...props}>
      {props?.children ?? "Go back"}
    </Button>
  );
}
