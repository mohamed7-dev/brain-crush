import React from "react";
import { Drawer } from "@/components/ui/styled-drawer";
import Box from "@mui/material/Box";
import { drawerClasses } from "@mui/material/Drawer";
import { SidebarMenuContent } from "./sidebar-menu-content";
import { Logo } from "../logo";
import Stack from "@mui/material/Stack";
import { SidebarFooter } from "./sidebar-footer";

export function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
          boxShadow: 0,
          border: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
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
        <SidebarMenuContent />
      </Box>
      <Stack sx={{ p: 2 }}>
        <SidebarFooter />
      </Stack>
    </Drawer>
  );
}
