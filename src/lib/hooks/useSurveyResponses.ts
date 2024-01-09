import { getSurveyResponses } from "@/app/actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function useSurveyResponses(surveyId: string) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
  });
  const [sort, setSort] = useState<{ name: string; type: "desc" | "asc" }>({
    name: "updated_at",
    type: "desc",
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updated_at", desc: true },
  ]);

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "responses", pagination.pageIndex + 1, sort],
    queryFn: () => getSurveyResponses(surveyId, pagination.pageIndex + 1, sort),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  useEffect(() => {
    setPagination((pagination) => ({
      pageIndex: 0,
      pageSize: pagination.pageSize,
    }));
    setSort({
      name: sorting[0].id,
      type: sorting[0].desc ? "desc" : "asc",
    });
  }, [sorting]);

  return {
    responses: data?.data,
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
