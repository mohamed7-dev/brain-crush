"use client";
import React from "react";
import Box from "@mui/material/Box";
import { Sidebar } from "../sidebar/sidebar";
import { SearchBox } from "@/features/app-shell/components/search-box";
import { SidebarMenuContent } from "../dashboard-layout/sidebar-menu-content";
import { Header } from "../header/header";
import Stack from "@mui/material/Stack";
import { Main } from "../styled-main";

type DashboardLayoutViewProps = {
  children: React.ReactNode;
};
export function DashboardLayoutView({ children }: DashboardLayoutViewProps) {
  return (
    <Stack direction={"row"}>
      <Sidebar layout="Dashboard">
        <SidebarMenuContent />
      </Sidebar>
      <Stack sx={{ gap: 2, width: "100%" }}>
        <Stack sx={{ gap: 1 }}>
          <Header>
            <SidebarMenuContent />
          </Header>
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              p: 1,
            }}
          >
            <React.Suspense>
              <SearchBox />
            </React.Suspense>
          </Box>
        </Stack>
        <Main component="main">{children}</Main>
      </Stack>
    </Stack>
  );
}
