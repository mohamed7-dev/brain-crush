"use client";
import React from "react";
import Box from "@mui/material/Box";
import { SearchBox } from "@/features/app-shell/components/search-box";
import { Header } from "../header/header";
import { FetchCourseChaptersSuccessRes } from "@/features/courses/api/fetch-course-chapters.api";
import { SidebarMenuContent } from "../course-layout/sidebar-menu-content";
import { Main } from "../styled-main";
import { Stack } from "@mui/material";
import { Sidebar } from "../sidebar/sidebar";

type CourseLayoutViewProps = {
  children: React.ReactNode;
  course: FetchCourseChaptersSuccessRes["data"];
};
export function CourseLayoutView({ children, course }: CourseLayoutViewProps) {
  return (
    <Stack direction={"row"} sx={{ minHeight: "100vh" }}>
      <Sidebar layout="Course">
        <SidebarMenuContent course={course} />
      </Sidebar>
      <Stack
        sx={{
          width: "100%",
          flex: 1,
          height: "full",
        }}
      >
        <Stack sx={{ gap: 1 }}>
          <Header>
            <SidebarMenuContent course={course} />
          </Header>
          <Box sx={{ display: { xs: "block", md: "none" }, p: 1 }}>
            <React.Suspense>
              <SearchBox />
            </React.Suspense>
          </Box>
        </Stack>
        <Main component="main">{children}</Main>
      </Stack>
    </Stack>
  );
}
