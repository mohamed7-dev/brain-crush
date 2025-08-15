import React from "react";
import { SearchOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Table } from "@tanstack/react-table";
import { TeacherCourseRowData } from "../../lib/courses-datagrid";
import Stack from "@mui/material/Stack";
import { SearchMode, SearchModeSelectMenu } from "./search-mode-select-menu";

export function SearchBox({
  handleChange,
  table,
  query,
}: {
  handleChange: (value: string) => void;
  query: string;
  table: Table<TeacherCourseRowData>;
}) {
  const [searchMode, setSearchMode] = React.useState<SearchMode>("client");
  const handleSearching = (val: string) => {
    if (searchMode === "client") {
      table.getColumn("title")?.setFilterValue(val);
    } else {
      handleChange(val);
    }
  };
  return (
    <Stack direction={"row"} sx={{ alignItems: "center", gap: 2 }}>
      <Box
        component={"form"}
        autoComplete="off"
        sx={{ position: "relative", minWidth: { md: 400 } }}
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField
          placeholder="Search for courses by title..."
          value={
            searchMode === "client"
              ? (table.getColumn("title")?.getFilterValue() as string) ?? ""
              : query ?? ""
          }
          onChange={(e) => handleSearching(e.target.value)}
          sx={{
            minWidth: "100%",
            flexGrow: 1,
          }}
          slotProps={{
            input: {
              sx: { paddingRight: 5 },
            },
          }}
        />
        <IconButton
          type="submit"
          sx={{
            position: "absolute",
            right: 1,
            top: 2,
            border: 0,
          }}
          size="small"
        >
          <SearchOutlined />
        </IconButton>
      </Box>
      <SearchModeSelectMenu
        handleChange={(val) => setSearchMode(val)}
        searchMode={searchMode}
      />
    </Stack>
  );
}
