import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { TeacherModeButton } from "../teacher-mode-button";
import { SidebarFooter } from "./sidebar-footer";
import { AuthButton } from "../auth-button";

type MobileSidebarProps = {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
  children: React.ReactNode;
};

export function MobileSidebar({
  open,
  toggleDrawer,
  children,
}: MobileSidebarProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70vw",
          minWidth: "15rem",
          height: "100%",
        }}
      >
        <Stack direction={"column"} sx={{ p: 2, gap: "10px" }}>
          <TeacherModeButton />
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          {children}
          <Divider />
        </Stack>
        <Stack sx={{ p: 2, gap: "10px" }}>
          <AuthButton />
          <SidebarFooter />
        </Stack>
      </Stack>
    </Drawer>
  );
}
