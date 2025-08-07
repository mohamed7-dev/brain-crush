"use client";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import CircularProgress from "@mui/material/CircularProgress";
import { useQueryCategories } from "@/features/categories/hooks/use-query-categories";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { EditOutlined } from "@mui/icons-material";
import { useUpdateCourse } from "../../hooks/use-update-course";
import { useSnackbar } from "@/components/providers/snackbar-provider";
import { useRouter } from "next/navigation";

type CourseCategorySectionProps = {
  defaultCategoryId: FetchCourseSuccessRes["data"]["categoryId"];
  courseId: FetchCourseSuccessRes["data"]["id"];
};

export function CourseCategorySection({
  defaultCategoryId,
  courseId,
}: CourseCategorySectionProps) {
  const [category, setCategory] = React.useState(defaultCategoryId ?? "");
  const [isEditing, setIsEditing] = React.useState(false);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const { data, isLoading } = useQueryCategories(undefined);
  const categories = data?.pages.flatMap((p) => p.data);

  const { mutateAsync: updateCourse, isPending: isUpdating } = useUpdateCourse({
    onSuccess: (data) => {
      showSnackbar({ message: data.message, severity: "success" });
      router.refresh();
      setCategory(data.data.id);
    },
    onError: (error) => {
      showSnackbar({ message: error.message, severity: "error" });
    },
  });

  const handleSubmit = async () => {
    await updateCourse({ dataToUpdate: { categoryId: category }, courseId });
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 1.5,
      }}
    >
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography component={"p"} variant="subtitle2">
          Course category
        </Typography>
        <Button
          variant="outlined"
          startIcon={isEditing ? undefined : <EditOutlined />}
          onClick={toggleEdit}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </Stack>
      <Stack sx={{ gap: 2 }}>
        {!isEditing && (
          <Typography component={"p"} variant="body2">
            {isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              categories?.find((cat) => cat.id === defaultCategoryId)?.name ??
              "No Category"
            )}
          </Typography>
        )}
        {isEditing && (
          <Stack sx={{ gap: 2 }}>
            <Autocomplete
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              getOptionLabel={(option) => option.name}
              options={categories ?? []}
              loading={isLoading}
              filterSelectedOptions
              onChange={(_e, value) => setCategory(value?.id!)}
              value={categories?.find((cat) => cat.id === defaultCategoryId)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Pick course category!"
                  disabled={isUpdating}
                  margin="normal"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      sx: { height: "3rem" },
                      endAdornment: (
                        <React.Fragment>
                          {isLoading ? (
                            <CircularProgress
                              color="inherit"
                              size={20}
                              sx={{ marginInlineEnd: 2 }}
                            />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    },
                  }}
                />
              )}
            />
            <Button
              variant={"outlined"}
              color={"secondary"}
              loading={isUpdating}
              loadingPosition="start"
              disabled={isUpdating}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
