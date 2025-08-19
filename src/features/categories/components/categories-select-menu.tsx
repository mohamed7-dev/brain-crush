import React from "react";
import Select from "@mui/material/Select";
import { useQueryCategories } from "../hooks/use-query-categories";
import MenuItem from "@mui/material/MenuItem";
import { Box, FormControl, OutlinedInput } from "@mui/material";

type CategoriesSelectMenuProps = {
  categoryId: string;
  handleChange: (value: string) => void;
};
export function CategoriesSelectMenu({
  handleChange,
  categoryId,
}: CategoriesSelectMenuProps) {
  const { data } = useQueryCategories();
  const categories = data.pages.flatMap((p) => p.data) ?? [];

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <Select
          labelId="search-mode-select-label"
          id="search-mode-select"
          value={categoryId ?? ""}
          onChange={(e) => handleChange(e.target.value)}
          displayEmpty
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Category</em>;
            }
            return categories.find((cat) => cat.id === selected)?.name ?? "";
          }}
        >
          <MenuItem disabled value="">
            <em>Category</em>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
