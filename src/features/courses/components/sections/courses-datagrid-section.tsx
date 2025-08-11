"use client";
import React from "react";
import { coursesDatagridColumns } from "../../lib/courses-datagrid";
import {
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useGetCourses } from "../../hooks/use-get-courses";
import { GET_COURSES_DEFAULT_LIMIT } from "../../lib/constants";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { routes } from "@/lib/routes";
import { AddOutlined } from "@mui/icons-material";

export function CoursesDatagridSection() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: GET_COURSES_DEFAULT_LIMIT,
  });
  const { data, hasNextPage, fetchNextPage } = useGetCourses({});

  const rows = data?.pages?.[pagination.pageIndex]?.data ?? [];
  const totalRowsCount = data?.pages[pagination.pageIndex]?.total ?? 0;

  const table = useReactTable({
    data: rows,
    columns: coursesDatagridColumns,
    manualPagination: true,
    rowCount: totalRowsCount,
    state: {
      pagination,
    },
    autoResetPageIndex: false,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // onSortingChange: setSorting,
    // getSortedRowModel: getSortedRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    // getFilteredRowModel: getFilteredRowModel(),

    // state: {
    //   sorting,
    //   columnFilters,
    // },
  });
  return (
    <Stack sx={{ gap: 1 }}>
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <TextField placeholder="e.g. 'learn javascript'" />
        <Button
          variant="contained"
          href={routes.teacherCreateCourse}
          startIcon={<AddOutlined />}
        >
          Create New Course
        </Button>
      </Stack>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={coursesDatagridColumns.length}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "end", gap: 1, py: 1 }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            table.nextPage();
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
}
