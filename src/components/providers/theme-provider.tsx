import React from "react";
import { ThemeProvider as BaseThemeProvider } from "@mui/material/styles";
import { theme } from "@/lib/theme";
import { CssBaseline, InitColorSchemeScript } from "@mui/material";

type ThemeProviderProps = {
  children: React.ReactNode;
};
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <BaseThemeProvider theme={theme} disableTransitionOnChange>
      <CssBaseline enableColorScheme />
      <InitColorSchemeScript defaultMode="system" attribute="class" />
      {children}
    </BaseThemeProvider>
  );
}
