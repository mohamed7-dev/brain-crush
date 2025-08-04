"use client";
import React from "react";
import { Header } from "../dashboard-layout/header";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import { Sidebar } from "../dashboard-layout/sidebar";

type DashboardLayoutViewProps = {
  children: React.ReactNode;
};
export function DashboardLayoutView({ children }: DashboardLayoutViewProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: "auto",
          mt: { xs: 8, md: 0 },
        })}
      >
        <Header />
        {children}
      </Box>
    </Box>
  );
}
