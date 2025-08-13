import React from "react";
import { Drawer, DrawerLayout } from "@/components/ui/styled-drawer";
import Box from "@mui/material/Box";
import { Logo } from "../logo";
import Stack from "@mui/material/Stack";
import { SidebarFooter } from "./sidebar-footer";

type SidebarProps = {
  children: React.ReactNode;
  layout: DrawerLayout;
};
export function Sidebar({ children, layout }: SidebarProps) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
      }}
      layout={layout}
    >
      <Box
        sx={{
          display: "flex",
          p: 1.5,
        }}
      >
        <Logo />
      </Box>
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
      <Stack sx={{ p: 2 }}>
        <SidebarFooter />
      </Stack>
    </Drawer>
  );
}
