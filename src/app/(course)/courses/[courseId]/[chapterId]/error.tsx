"use client";
import React from "react";
import { ErrorPlaceholder } from "@/components/error-placeholder";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CourseChapterErrorPage({ error }: { error: Error }) {
  const router = useRouter();
  return (
    <ErrorPlaceholder error={error}>
      <Button variant="outlined" onClick={() => router.back()}>
        Go back
      </Button>
    </ErrorPlaceholder>
  );
}
