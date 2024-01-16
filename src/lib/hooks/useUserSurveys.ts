import { getUserSurveys } from "@/app/actions";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function useUserSurveys() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });
  const [sort, setSort] = useState<{ column: string; type: "desc" | "asc" }>({
    column: "updated_at",
    type: "desc",
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updated_at", desc: true },
  ]);

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    staleTime: 0,
    queryKey: ["user", "surveys", pagination.pageIndex + 1, sort],
    queryFn: () => getUserSurveys(pagination.pageIndex + 1, sort),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

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
    surveys: data?.data,
    pageCount: data?.total_pages || 0,
    isLoading,
    pagination,
    sorting,
    setSorting,
    setPagination,
    isFetching,
    isRefetching,
  };
}
