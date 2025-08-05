"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { CreateCourseForm } from "../forms/create-course-form";

export function CreateCoursePageView() {
  return (
    <Stack
      direction={"row"}
      sx={{
        maxWidth: (theme) => theme.breakpoints.values.xl,
        height: "100%",
        p: 6,
        mx: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack direction={"column"}>
          <Typography variant="h1">Name your course</Typography>
          <Typography variant="body1">
            What would you like to name your course? Don&apos;t worry, you can
            change this later.
          </Typography>
        </Stack>
        <CreateCourseForm />
      </Stack>
    </Stack>
  );
}
