import React from "react";
import { routes } from "@/lib/routes";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";
import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";

export function TeacherModeButton() {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes(routes.teacher);
  if (isTeacherPage) {
    return (
      <Button
        variant="contained"
        href={routes.home}
        startIcon={<ExitToAppOutlined />}
      >
        Exit Teacher Mode
      </Button>
    );
  }
  return (
    <Button
      variant="contained"
      color={"secondary"}
      href={routes.teacherCourses}
    >
      Teacher Mode
    </Button>
  );
}
