"use client";
import { styled } from "@mui/material/styles";
import { tabsClasses } from "@mui/material/Tabs";
import MuiToolbar from "@mui/material/Toolbar";

export const Toolbar = styled(MuiToolbar)({
  flexGrow: 1,
  width: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  gap: "12px",
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: "8px",
    p: "8px",
    pb: 0,
  },
});
