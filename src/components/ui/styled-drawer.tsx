import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses, DrawerProps } from "@mui/material/Drawer";

export const dashboardDrawerWidth = 240;
export const courseDrawerWidth = 300;
export type DrawerLayout = "Dashboard" | "Course";
export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "layout",
})<DrawerProps & { layout?: DrawerLayout }>(({ theme, layout }) =>
  theme.unstable_sx({
    width: layout === "Course" ? courseDrawerWidth : dashboardDrawerWidth,
    flexShrink: 0,
    boxSizing: "border-box",
    [`& .${drawerClasses.paper}`]: {
      width: layout === "Course" ? courseDrawerWidth : dashboardDrawerWidth,
      boxSizing: "border-box",
      backgroundColor: "background.paper",
      boxShadow: 0,
      border: 0,
    },
  })
);
