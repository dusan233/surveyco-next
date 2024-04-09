import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { SortObject } from "../lib/types";
import { useToast } from "@/components/ui/use-toast";
import { getSurveyCollectors } from "@/app/_api/survey";
import { useAuth } from "@clerk/nextjs";

export default function useSurveyCollectors(surveyId: string) {
  const { toast } = useToast();
  const { getToken } = useAuth();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [sort, setSort] = useState<SortObject>({
    column: "updated_at",
    type: "desc",
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updated_at", desc: true },
  ]);

  const { data, isLoading, isFetching, isRefetching, isError } = useQuery({
    staleTime: 0,
    queryKey: [
      "survey",
      surveyId,
      "collectors",
      pagination.pageIndex + 1,
      sort,
    ],
    queryFn: async () => {
      const token = await getToken();
      return getSurveyCollectors({
        surveyId,
        page: pagination.pageIndex + 1,
        sort,
        token,
      });
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const lastSuccessData = useRef(data);

  useEffect(() => {
    if (isError) {
      toast({ variant: "destructive", title: "Something went wrong!" });
    }
  }, [isError, toast]);

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
    collectors: data?.data,
    pageCount: data?.total_pages || 0,
    isLoading,
    pagination,
    sorting,
    setSorting,
    setPagination,
    isFetching,
    isRefetching,
    lastSuccessData,
    isError,
  };
}