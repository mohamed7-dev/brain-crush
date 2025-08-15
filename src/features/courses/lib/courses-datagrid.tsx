import React from "react";
import { routes } from "@/lib/routes";
import { formatPrice } from "@/lib/utils";
import { ImportExportOutlined, MoreVertOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FetchCoursesSuccessRes } from "../api/fetch-courses.api";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

function PublishingStatus({ status }: { status: boolean }) {
  return (
    <Chip
      label={status ? "Published" : "Draft"}
      color={status ? "secondary" : undefined}
      size="small"
      variant="outlined"
    />
  );
}

export type TeacherCourseRowData = FetchCoursesSuccessRes["data"][number];

interface ActionsMenuProps {
  row: Row<TeacherCourseRowData>;
}

function ActionsMenu({ row }: ActionsMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    router.push(routes.teacherCourse(row.original.id));
    handleClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <MoreVertOutlined fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{
            minWidth: 140,
          }}
        >
          Edit
        </MenuItem>
      </Menu>
    </>
  );
}

export const coursesDatagridColumns: ColumnDef<TeacherCourseRowData>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="outlined"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sx={{ width: "100%" }}
          endIcon={<ImportExportOutlined fontSize="small" />}
        >
          Title
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="outlined"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sx={{ width: "100%" }}
          endIcon={<ImportExportOutlined fontSize="small" />}
        >
          Price
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0");
      const formatted = formatPrice(price);

      return <Box>{price ? formatted : "Price Not Yet Specified"}</Box>;
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="outlined"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sx={{ width: "100%" }}
          endIcon={<ImportExportOutlined fontSize="small" />}
        >
          Published
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPublished = (row.getValue("isPublished") as boolean) || false;

      return <PublishingStatus status={isPublished} />;
    },
  },
  {
    id: "actions",
    header: () => {
      return (
        <Button variant="outlined" sx={{ width: "100%" }}>
          Actions
        </Button>
      );
    },
    cell: ({ row }) => {
      return <ActionsMenu row={row} />;
    },
  },
];
