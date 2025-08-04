"use client";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

type SessionProviderProps = {
  children: React.ReactNode;
};
export function SessionProvider({ children }: SessionProviderProps) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
