import * as React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { SidebarMenuContent } from "./sidebar-menu-content";
import { TeacherModeButton } from "../teacher-mode-button";
import { SidebarFooter } from "./sidebar-footer";
import { Logo } from "../logo";

type MobileSidebarProps = {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
};

export function MobileSidebar({ open, toggleDrawer }: MobileSidebarProps) {
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
        {/* <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt="Riley Carter"
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              Riley Carter
            </Typography>
          </Stack> */}
        <Stack direction={"column"} sx={{ p: 2, gap: "10px" }}>
          <Logo />
          <Divider />
          <TeacherModeButton />
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <SidebarMenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2, gap: "10px" }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
          >
            Logout
          </Button>
          <SidebarFooter />
        </Stack>
      </Stack>
    </Drawer>
  );
}
