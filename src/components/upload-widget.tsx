"use client";
import React from "react";
import { UploadFileOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CldUploadWidget, CldUploadWidgetProps } from "next-cloudinary";

type UploadWidgetProps = {
  widgetProps: Omit<CldUploadWidgetProps, "children" | "uploadPreset">;
  buttonProps?: React.ComponentProps<typeof Button>;
};
export function UploadWidget({
  widgetProps: { options, ...widgetProps },
  buttonProps,
}: UploadWidgetProps) {
  return (
    <CldUploadWidget
      {...widgetProps}
      uploadPreset={process.env.NEXT_PUBLIC_PRESET_NAME}
      options={{
        styles: {
          palette: {
            window: "#1f2937", // Background
            sourceBg: "#374151", // Tabs background
            windowBorder: "#4b5563", // Border
            tabIcon: "#f9fafb", // Tab icon color
            menuIcons: "#f9fafb", // Menu icons
            textDark: "#f9fafb", // Text
            textLight: "#9ca3af", // Secondary text
            link: "#3b82f6", // Link color
            action: "#2563eb", // Button color
            inactiveTabIcon: "#6b7280", // Inactive tab icons
            error: "#ef4444", // Error color
            inProgress: "#3b82f6", // Progress bar color
            complete: "#10b981", // Complete color
            sourceBorder: "#4b5563", // Source border
            sourceBgHover: "#1f2937", // Source hover background
          },
        },
        ...options,
      }}
    >
      {({ open }) => {
        return (
          <Button
            variant="outlined"
            color={"secondary"}
            onClick={() => open?.()}
            sx={{ gap: 1 }}
            {...buttonProps}
          >
            {buttonProps?.children ? (
              <React.Fragment>{buttonProps.children}</React.Fragment>
            ) : (
              <React.Fragment>
                <UploadFileOutlined />
                <Typography component={"span"} variant="button">
                  Upload
                </Typography>
              </React.Fragment>
            )}
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
