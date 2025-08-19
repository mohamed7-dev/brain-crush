import React from "react";
import { useColorScheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

export function SidebarFooter() {
  const { mode, setMode } = useColorScheme();

  const handleChange = React.useCallback(
    (
      _: React.MouseEvent<HTMLElement>,
      newMode: "light" | "dark" | "system" | null
    ) => {
      if (newMode !== null) {
        setMode(newMode);
      }
    },
    [setMode]
  );

  if (!mode) {
    return null;
  }

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      size="small"
      onChange={handleChange}
      aria-label="color scheme switcher"
    >
      <ToggleButton
        sx={{ flexGrow: 1 }}
        value="system"
        aria-label="system mode"
      >
        <SettingsBrightnessIcon />
      </ToggleButton>
      <ToggleButton sx={{ flexGrow: 1 }} value="light" aria-label="light mode">
        <LightModeIcon />
      </ToggleButton>
      <ToggleButton sx={{ flexGrow: 1 }} value="dark" aria-label="dark mode">
        <DarkModeIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
