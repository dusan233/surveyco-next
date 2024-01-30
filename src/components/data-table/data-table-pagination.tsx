import React from "react";
import { Button } from "../ui/button";
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
} from "../ui/select";
import Spinner from "../ui/spinner";
import { Updater } from "@tanstack/react-table";

type DataTablePaginationProps = {
  loading: boolean;
  previousPageDisabled: boolean;
  nextPageDisabled: boolean;
  pageCount: number;
  pageVal: string;
  previousPage: () => void;
  nextPage: () => void;
  setPageIndex: (updater: Updater<number>) => void;
};

const DataTablePagination = ({
  loading,
  previousPageDisabled,
  pageCount,
  nextPage,
  setPageIndex,
  previousPage,
  pageVal,
  nextPageDisabled,
}: DataTablePaginationProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Button
        variant="ghost"
        size="icon"
        className="hidden sm:inline-flex"
        disabled={previousPageDisabled}
        onClick={() => setPageIndex(0)}
      >
        <ChevronsLeft />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        disabled={previousPageDisabled}
        onClick={() => previousPage()}
      >
        <ChevronLeft />
      </Button>
      <div className="w-20">
        <Select
          value={pageVal}
          onValueChange={(value) => {
            setPageIndex(Number(value) - 1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Page" />
          </SelectTrigger>

          <SelectContent>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (page) => (
                <SelectItem key={page} value={page.toString()}>
                  {page}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="ghost"
        size="icon"
        disabled={nextPageDisabled}
        onClick={() => nextPage()}
      >
        <ChevronRight />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hidden sm:inline-flex"
        disabled={nextPageDisabled}
        onClick={() => setPageIndex(pageCount - 1)}
      >
        <ChevronsRight />
      </Button>
      {loading && <Spinner size="sm" />}
    </div>
  );
};

export default DataTablePagination;
