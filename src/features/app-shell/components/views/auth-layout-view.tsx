import Box from "@mui/material/Box";
import React from "react";

type AuthLayoutViewProps = {
  children: React.ReactNode;
};

export function AuthLayoutView({ children }: AuthLayoutViewProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.paper",
      }}
    >
      {children}
    </Box>
  );
}
