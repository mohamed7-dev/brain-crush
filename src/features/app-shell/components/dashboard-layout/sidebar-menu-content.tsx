"use client";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CompassCalibrationRounded from "@mui/icons-material/CompassCalibrationRounded";
import { routes } from "@/lib/routes";
import { usePathname, useRouter } from "next/navigation";
import { BarChartRounded, ListRounded } from "@mui/icons-material";

const guestListItems = [
  { text: "Browse", icon: <CompassCalibrationRounded />, href: routes.home },
  { text: "Dashboard", icon: <DashboardRoundedIcon />, href: routes.dashboard },
];

const teacherListItems = [
  { text: "Courses", icon: <ListRounded />, href: routes.teacherCourses },
  {
    text: "Analytics",
    icon: <BarChartRounded />,
    href: routes.teacherAnalytics,
  },
];

export function SidebarMenuContent() {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes(routes.teacher);

  const mainListItems = isTeacherPage ? teacherListItems : guestListItems;

  const isActive = React.useCallback(
    (href: string) => {
      return (
        (pathname === routes.home && href === routes.home) ||
        pathname === href ||
        pathname?.startsWith(`${href}/`)
      );
    },
    [pathname]
  );

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton selected={isActive(item.href)} href={item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
