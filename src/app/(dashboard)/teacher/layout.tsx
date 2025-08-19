import React from "react";
import { userOnly } from "@/features/me/lib/authorization";
import { checkIsTeacher } from "@/features/me/lib/utils";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

export const dynamic = "auto";

type TeacherLayoutProps = {
  children: React.ReactNode;
};
export default async function TeacherLayout({ children }: TeacherLayoutProps) {
  const { userId } = await userOnly();
  const isTeacher = checkIsTeacher(userId);
  if (!userId || !isTeacher) {
    redirect(routes.home);
  }
  return <>{children}</>;
}
