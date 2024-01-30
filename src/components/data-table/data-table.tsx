"use client";

import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";

import { Dispatch, SetStateAction } from "react";
import DataTableHeader from "./data-table-header";
import DataTableBody from "./data-table-body";
import DataTablePagination from "./data-table-pagination";
import { ScrollArea } from "../ui/scroll-area";
import Spinner from "../ui/spinner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  pageCount: number;
  sortingState: SortingState;
  paginationState: PaginationState;
  onSortingChange: Dispatch<SetStateAction<SortingState>>;
  onPaginationChange: Dispatch<React.SetStateAction<PaginationState>>;
  totalItemCount?: number;
  noDataMsg?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  loading,
  onPaginationChange,
  totalItemCount,
  paginationState,
  sortingState,
  noDataMsg,
  onSortingChange,
}: DataTableProps<TData, TValue>) {
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
    <div className="bg-white drop-shadow-sm rounded-md b">
      <div className="overflow-auto rounded-md max-h-[500px]">
        <Table className="bg-white">
          <DataTableHeader getHeaderGroups={getHeaderGroups} />
          <DataTableBody
            getRowModel={getRowModel}
            columnsLength={columns.length}
            noDataMsg={noDataMsg}
          />
        </Table>
      </div>

      <div className="flex px-4 border-t items-center h-16">
        {pageCount > 1 && (
          <DataTablePagination
            nextPage={nextPage}
            previousPage={previousPage}
            nextPageDisabled={!getCanNextPage() || loading}
            previousPageDisabled={!getCanPreviousPage() || loading}
            pageCount={getPageCount()}
            loading={loading}
            pageVal={(paginationState.pageIndex + 1).toString()}
            setPageIndex={setPageIndex}
          />
        )}
        {loading && <Spinner size="sm" />}
        {totalItemCount !== undefined && (
          <div className="flex-1 text-right font-medium">
            Total: {totalItemCount}
          </div>
        )}
      </div>
    </div>
  );
}
