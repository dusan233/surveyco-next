"use client";

import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface SurveyResponsesTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  pageCount: number;
  sortingState: SortingState;
  paginationState: PaginationState;
  onSortingChange: Dispatch<SetStateAction<SortingState>>;
  onPaginationChange: Dispatch<React.SetStateAction<PaginationState>>;
  responsesCount?: number;
}

export function SurveyResponsesTable<TData, TValue>({
  columns,
  data,
  pageCount,
  loading,
  onPaginationChange,
  responsesCount,
  paginationState,
  sortingState,
  onSortingChange,
}: SurveyResponsesTableProps<TData, TValue>) {
  const {
    getHeaderGroups,
    getRowModel,
    previousPage,
    getCanPreviousPage,
    nextPage,
    getCanNextPage,
    setPageIndex,
    getPageCount,
  } = useReactTable({
    data,
    columns,
    onPaginationChange: onPaginationChange,
    onSortingChange: onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount,
    state: {
      pagination: {
        pageIndex: paginationState.pageIndex,
        pageSize: paginationState.pageSize,
      },
      sorting: sortingState,
    },
  });

  return (
    <div className="bg-white rounded-md b">
      <div className="overflow-auto rounded-md max-h-[500px]">
        <Table className="bg-white">
          <TableHeader>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="shadow-sm bg-white sticky top-0"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      className={`bg-white ${
                        index === 0 && "sticky left-0 top-0 max-w-[100px]"
                      }`}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {getRowModel().rows?.length ? (
              getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      className={`px-4 bg-white py-2 h-10 truncate ... ${
                        index === 0 && "sticky left-0 top-0 max-w-[100px]"
                      }`}
                      key={cell.id}
                    >
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex px-4 items-center h-16">
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            disabled={!getCanPreviousPage() || loading}
            onClick={() => setPageIndex(0)}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={!getCanPreviousPage() || loading}
            onClick={() => previousPage()}
          >
            <ChevronLeft />
          </Button>
          <div className="w-20">
            <Select
              value={(paginationState.pageIndex + 1).toString()}
              onValueChange={(value) => {
                setPageIndex(Number(value) - 1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Page" />
              </SelectTrigger>

              <SelectContent>
                {Array.from(
                  { length: getPageCount() },
                  (_, index) => index + 1
                ).map((page) => (
                  <SelectItem key={page} value={page.toString()}>
                    {page}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="ghost"
            size="icon"
            disabled={!getCanNextPage() || loading}
            onClick={() => nextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            disabled={!getCanNextPage() || loading}
            onClick={() => setPageIndex(getPageCount() - 1)}
          >
            <ChevronsRight />
          </Button>
          {loading && <Spinner size="sm" />}
        </div>
        {responsesCount !== undefined && (
          <div className="flex-1 text-right font-medium">
            Total responses: {responsesCount}
          </div>
        )}
      </div>
    </div>
  );
}
