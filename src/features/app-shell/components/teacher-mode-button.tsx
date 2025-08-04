import React from "react";
import { routes } from "@/lib/routes";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";

export function TeacherModeButton() {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes(routes.teacher);
  if (isTeacherPage) {
    return (
      <Button color={"secondary"} href={routes.home}>
        Exit Teacher Mode
      </Button>
    );
  }
  return (
    <Button color={"secondary"} href={routes.teacherCreateCourse}>
      Teacher Mode
    </Button>
  );
}
