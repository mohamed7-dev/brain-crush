import { green } from "@/lib/theme/primitives";
import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Stack,
  Typography,
} from "@mui/material";

type CourseProgressProps = {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
};

export function CourseProgress({ value, variant, size }: CourseProgressProps) {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          // color={variant === "default" ? "primary" : "secondary"}
          value={value}
          sx={{
            [`& .${linearProgressClasses.colorPrimary}`]: { color: green[50] },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant={size === "sm" ? "caption" : "body2"}
          sx={{ color: "text.secondary" }}
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Stack>
  );
}
