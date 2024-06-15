import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { getSurveyResponses } from "@/api/survey";
import { useAuth } from "@clerk/nextjs";
import { SortObject } from "@/types/common";

export default function useSurveyIndividualResponses(surveyId: string) {
  const { getToken } = useAuth();
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

  const { data, ...queryInfo } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "responses", pagination.pageIndex + 1, sort],
    queryFn: async () => {
      const token = await getToken();
      return getSurveyResponses({
        surveyId,
        sort,
        page: pagination.pageIndex + 1,
        token,
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
    responses: data?.data,
    pageCount: data?.total_pages || 0,
    pagination,
    sorting,
    setSorting,
    setPagination,
    lastSuccessData,
    ...queryInfo,
  };
}
