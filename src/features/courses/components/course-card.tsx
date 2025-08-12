import React from "react";
import { IconBadge } from "@/components/ui/icon-badge";
import { routes } from "@/lib/routes";
import { formatPrice } from "@/lib/utils";
import { BookOutlined } from "@mui/icons-material";
import { Box, Typography, Link } from "@mui/material";
import Stack from "@mui/material/Stack";
import { CldImage } from "next-cloudinary";
import { CourseProgress } from "./course-progress";
import { type CourseCard } from "./sections/courses-list-section";

type CourseCardProps = { course: CourseCard };

export function CourseCard({ course }: CourseCardProps) {
  const {
    id,
    title,
    coverImagePublicId,
    chaptersLength,
    price,
    progress,
    categoryName,
  } = course;
  return (
    <article style={{ width: "100%", height: "100%" }}>
      <Link
        href={routes.course(id)}
        sx={{
          width: "100%",
          height: "100%",
          "&::before": {
            width: 0,
            height: 0,
          },
        }}
      >
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            p: 1.5,
            borderRadius: 1.5,
            bgcolor: "background.paper",
            gap: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "50%",
              aspectRatio: "16:9",
            }}
          >
            <CldImage
              src={coverImagePublicId}
              alt={`$cover image of the course ${title}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Stack sx={{ gap: 2 }}>
            <Box>
              <Typography component={"h1"} variant="h6" color="textPrimary">
                {title}
              </Typography>
              <Typography
                component={"p"}
                variant="subtitle1"
                color="textSecondary"
              >
                {categoryName}
              </Typography>
            </Box>
            <Stack sx={{ gap: 3 }}>
              <Stack direction={"row"} sx={{ alignItems: "center", gap: 1 }}>
                <IconBadge icon={BookOutlined} size="sm" />
                <Typography component={"p"} variant="caption">
                  {chaptersLength}{" "}
                  {chaptersLength === 1 ? "Chapter" : "Chapters"}
                </Typography>
              </Stack>
              {progress !== null ? (
                <CourseProgress
                  variant={progress === 100 ? "success" : "default"}
                  size="sm"
                  value={progress}
                />
              ) : (
                <Typography component={"p"} variant="body1" color="textPrimary">
                  {formatPrice(price)}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Link>
    </article>
  );
}
