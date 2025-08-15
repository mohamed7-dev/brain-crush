"use client";
import React from "react";
import { routes } from "@/lib/routes";
import { SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { CategoriesSelectMenu } from "@/features/categories/components/categories-select-menu";

export function SearchBox() {
  const [query, setQuery] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleUpdatingSearchparams = (catId?: string) => {
    if (query || catId || categoryId) {
      const params = new URLSearchParams(searchParams.toString());

      params.set("q", query);
      params.set("category", catId ?? categoryId);

      router.push(`${routes.search}?${params.toString()}`);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCategoryChange = (val: string) => {
    setCategoryId(val);
    handleUpdatingSearchparams(val);
  };
  return (
    <Stack direction={"row"} spacing={{ md: 2 }} flexWrap={"wrap"}>
      <Box
        component={"form"}
        autoComplete="off"
        sx={{
          position: "relative",
          mb: { xs: 1, md: 0 },
          minWidth: { xs: "100%", md: 400 },
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          placeholder="Search for courses..."
          value={query ?? ""}
          onChange={(e) => setQuery(e.target.value)}
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
          onClick={() => handleUpdatingSearchparams()}
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
      <CategoriesSelectMenu
        categoryId={categoryId}
        handleChange={handleCategoryChange}
      />
    </Stack>
  );
}
