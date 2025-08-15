import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export type SearchMode = "client" | "server";
type SearchModeSelectMenuProps = {
  handleChange: (val: SearchMode) => void;
  searchMode: SearchMode;
};
export function SearchModeSelectMenu({
  handleChange,
  searchMode,
}: SearchModeSelectMenuProps) {
  return (
    <FormControl sx={{ width: { xs: "fit", md: 200 } }}>
      <InputLabel id="search-mode-select-label">Search mode</InputLabel>
      <Select
        labelId="search-mode-select-label"
        id="search-mode-select"
        value={searchMode}
        label="Search mode"
        onChange={(e) => handleChange(e.target.value as SearchMode)}
      >
        <MenuItem value={"client"}>Basic</MenuItem>
        <MenuItem value={"server"}>Advanced</MenuItem>
      </Select>
    </FormControl>
  );
}
