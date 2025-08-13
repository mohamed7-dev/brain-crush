import React from "react";
import { routes } from "@/lib/routes";
import {
  CheckOutlined,
  LockOutlined,
  PlayCircleOutlined,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import ListItem from "@mui/material/ListItem";
import ListItemButton, {
  listItemButtonClasses,
} from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface SidebarItemProps {
  title: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export function SidebarItem({
  isLocked,
  isCompleted,
  id,
  title,
  courseId,
}: SidebarItemProps) {
  const pathname = usePathname();

  const Icon = isLocked
    ? LockOutlined
    : isCompleted
    ? CheckOutlined
    : PlayCircleOutlined;

  const isActive = pathname?.includes(id);

  return (
    <ListItem
      key={id}
      disablePadding
      sx={{ display: "block", overflowY: "auto" }}
    >
      <ListItemButton
        selected={isActive}
        href={routes.courseChapter(id, courseId)}
        sx={{
          [`&.${listItemButtonClasses.root}`]: {
            color: isCompleted ? "InfoText" : "GrayText",
          },
        }}
      >
        <ListItemIcon>
          <Icon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
}
