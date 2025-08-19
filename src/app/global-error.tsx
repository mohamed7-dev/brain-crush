"use client";
import React from "react";
import { routes } from "@/lib/routes";
import { ErrorPlaceholder } from "@/components/error-placeholder";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <ErrorPlaceholder
      error={error}
      actionButtonLabel="Go home"
      actionButtonPath={routes.home}
    />
  );
}
