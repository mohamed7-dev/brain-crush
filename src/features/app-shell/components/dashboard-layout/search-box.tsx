"use client";
import { routes } from "@/lib/routes";
import { SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export function SearchBox() {
  const [query, setQuery] = React.useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const handleUpdatingSearchparams = () => {
    router.push(routes.search + "?" + createQueryString("q", query));
  };
  return (
    <Box
      component={"form"}
      autoComplete="off"
      sx={{ position: "relative" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        placeholder="Search for courses..."
        value={query ?? ""}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          minWidth: { xs: "100%", md: 400 },
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
        onClick={handleUpdatingSearchparams}
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
  );
}
