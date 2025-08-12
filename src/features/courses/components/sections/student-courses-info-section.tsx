import React from "react";
import { IconBadge } from "@/components/ui/icon-badge";
import { Grid, Stack, Typography } from "@mui/material";
import { CheckOutlined, WatchOutlined } from "@mui/icons-material";

type InfoCardProps = React.ComponentProps<typeof IconBadge> & {
  numberOfItems: number;
  label: string;
};

function InfoCard({ icon, label, variant, numberOfItems }: InfoCardProps) {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center", gap: 2 }}>
      <IconBadge icon={icon} variant={variant} />
      <Stack sx={{ gap: 1 }}>
        <Typography>{label}</Typography>
        <Typography>
          {numberOfItems} {numberOfItems == 1 ? "Course" : "Courses"}
        </Typography>
      </Stack>
    </Stack>
  );
}

type StudentCoursesInfoSectionProps = {
  completedCoursesLength: number;
  inProgressCoursesLength: number;
};
export function StudentCoursesInfoSection({
  completedCoursesLength,
  inProgressCoursesLength,
}: StudentCoursesInfoSectionProps) {
  return (
    <Grid container columns={13} columnGap={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <InfoCard
          icon={WatchOutlined}
          label="In Progress"
          numberOfItems={inProgressCoursesLength}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <InfoCard
          icon={CheckOutlined}
          label="Completed"
          numberOfItems={completedCoursesLength}
        />
      </Grid>
    </Grid>
  );
}
