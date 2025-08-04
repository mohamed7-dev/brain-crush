import React from "react";
import { DashboardLayoutView } from "@/features/app-shell";

type DashboardLayoutProps = {
  children: React.ReactNode;
};
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardLayoutView>{children}</DashboardLayoutView>;
}
