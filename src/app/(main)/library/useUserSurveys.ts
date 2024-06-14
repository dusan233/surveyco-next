import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { getUserSurveys } from "@/api/user";
import { useAuth } from "@clerk/nextjs";
import { SortObject } from "@/types/common";

export default function useUserSurveys() {
  const { userId, getToken } = useAuth();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });
  const [sort, setSort] = useState<SortObject>({
    column: "updated_at",
    type: "desc",
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updated_at", desc: true },
  ]);

  const { data, isLoading, isFetching, isRefetching, isError, error } =
    useQuery({
      staleTime: 0,
      queryKey: ["user", "surveys", pagination.pageIndex + 1, sort],
      queryFn: async () => {
        return getUserSurveys({
          page: pagination.pageIndex + 1,
          sort,
          token: await getToken(),
          userId: userId!,
        });
      },
      placeholderData: keepPreviousData,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const lastSuccessData = useRef(data);

  useEffect(() => {
    if (data) lastSuccessData.current = data;
    if (data?.data.length !== 0) {
      setPagination((pagination) => ({
        pageIndex: 0,
        pageSize: pagination.pageSize,
      }));
      setSort({
        column: sorting[0].id,
        type: sorting[0].desc ? "desc" : "asc",
      });
    }
  }, [sorting, data]);

  return {
    error,
    surveys: data?.data,
    pageCount: data?.total_pages || 0,
    isLoading,
    pagination,
    sorting,
    setSorting,
    setPagination,
    isFetching,
    isRefetching,
    isError,
    lastSuccessData,
  };
}
