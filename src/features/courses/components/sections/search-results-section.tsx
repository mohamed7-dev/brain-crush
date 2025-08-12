"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useBrowseCourses } from "../../hooks/use-browse-courses";

export function SearchResultsSection() {
  const searchParams = useSearchParams();
  const { data } = useBrowseCourses({
    variant: "Search",
    query: searchParams.get("q") ?? "",
  });
  return <>{JSON.stringify(data)}</>;
}
