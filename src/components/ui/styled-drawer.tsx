import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";

export const drawerWidth = 240;

export const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});
