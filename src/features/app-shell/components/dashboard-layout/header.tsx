import React from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import { Toolbar } from "@/components/ui/styled-toolbar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { MobileSidebar } from "./mobile-sidebar";
import { badgeClasses } from "@mui/material/Badge";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { TeacherModeButton } from "../teacher-mode-button";
import { AuthButton } from "../auth-button";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      sx={{
        position: { xs: "fixed", md: "static" },
        boxShadow: 0,
        bgcolor: "background.paper",
        backgroundImage: "none",
        top: "var(--template-frame-height, 0px)",
      }}
    >
      <Toolbar
        variant="regular"
        sx={{
          height: 60,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexGrow: 1,
            width: "100%",
          }}
        >
          <p>search bar</p>
          <Stack
            direction={"row"}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "4px",
            }}
          >
            <TeacherModeButton />
            <AuthButton />
          </Stack>
          {/* <p>settings overlay goes here dropdown/drawer</p>  */}
          <Badge
            color="error"
            variant="dot"
            invisible={!false}
            sx={{
              [`& .${badgeClasses.badge}`]: { right: 2, top: 2 },
              display: { md: "none" },
            }}
          >
            <IconButton
              size="small"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Badge>
          <MobileSidebar open={open} toggleDrawer={toggleDrawer} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
