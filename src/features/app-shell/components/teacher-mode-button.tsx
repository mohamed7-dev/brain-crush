import React from "react";
import { routes } from "@/lib/routes";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";
import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";
import { checkIsTeacher } from "@/features/me/lib/utils";
import { useUser } from "@clerk/nextjs";

export function TeacherModeButton() {
  const { user } = useUser();
  const isTeacher = checkIsTeacher(user?.id ?? "");

  const pathname = usePathname();
  const isTeacherPage = pathname?.includes(routes.teacher);

  if (!isTeacher) return null;

  if (isTeacherPage) {
    return (
      <Button
        variant="outlined"
        color={"secondary"}
        href={routes.home}
        startIcon={<ExitToAppOutlined />}
      >
        Exit Teacher Mode
      </Button>
    );
  }

  return (
    <Button variant="outlined" color={"secondary"} href={routes.teacherCourses}>
      Teacher Mode
    </Button>
  );
}
