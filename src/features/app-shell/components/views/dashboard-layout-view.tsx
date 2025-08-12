"use client";
import React from "react";
import { Header } from "../dashboard-layout/header";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import { Sidebar } from "../dashboard-layout/sidebar";
import { SearchBox } from "@/features/app-shell/components/dashboard-layout/search-box";

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
        <Box sx={{ display: { xs: "block", md: "none" }, p: 1 }}>
          <SearchBox />
        </Box>
        {children}
      </Box>
    </Box>
  );
}
