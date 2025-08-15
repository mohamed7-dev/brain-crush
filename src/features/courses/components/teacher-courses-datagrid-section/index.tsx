"use client";
import React from "react";
import { coursesDatagridColumns } from "../../lib/courses-datagrid";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
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
} from "@mui/material";
import { routes } from "@/lib/routes";
import { AddOutlined } from "@mui/icons-material";
import { useDebounce } from "@/hooks/use-debounce";
import { SearchBox } from "./search-box";

export function TeacherCoursesDatagridSection() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: GET_COURSES_DEFAULT_LIMIT,
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 500);

  const { data, hasNextPage, fetchNextPage } = useGetCourses({
    query: debouncedQuery,
  });

  const rows = data?.pages?.[pagination.pageIndex]?.data ?? [];
  const totalRowsCount = data?.pages[pagination.pageIndex]?.total ?? 0;

  const table = useReactTable({
    data: rows,
    columns: coursesDatagridColumns,
    manualPagination: true,
    rowCount: totalRowsCount,
    state: {
      pagination,
      columnFilters,
      sorting,
    },
    autoResetPageIndex: false,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <Stack sx={{ gap: 1 }}>
      <Stack
        direction={"row"}
        flexWrap={"wrap-reverse"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <SearchBox
          query={query}
          handleChange={(val) => setQuery(val)}
          table={table}
        />
        <Button
          color="secondary"
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
