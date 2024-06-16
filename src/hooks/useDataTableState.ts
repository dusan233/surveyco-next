import { SortObject } from "@/types/common";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export const useDataTableState = ({ pageSize = 10 }: { pageSize: number }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const [sort, setSort] = useState<SortObject>({
    column: "updated_at",
    type: "desc",
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updated_at", desc: true },
  ]);

  useEffect(() => {
    setPagination((pagination) => ({
      pageIndex: 0,
      pageSize: pagination.pageSize,
    }));
    setSort({
      column: sorting[0].id,
      type: sorting[0].desc ? "desc" : "asc",
    });
  }, [sorting]);

  return {
    sortObj: sort,
    sorting,
    setSorting,
    pagination,
    setPagination,
  };
};
