import React from "react";
import { AuthLayoutView } from "@/features/app-shell";

type AuthLayoutProps = {
  children: React.ReactNode;
};
export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthLayoutView>{children}</AuthLayoutView>;
}
