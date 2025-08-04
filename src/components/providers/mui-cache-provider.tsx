import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

type MuiCacheProviderProps = {
  children: React.ReactNode;
};
export function MuiCacheProvider({ children }: MuiCacheProviderProps) {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
}
