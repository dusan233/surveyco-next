import { getSurveyResponses } from "@/app/actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useSurveyResponses(surveyId: string) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "responses", page],
    queryFn: () => getSurveyResponses(surveyId, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return {
    responses: data?.data,
    isLoading,
    page,
    setPage,
    isFetching,
    isRefetching,
  };
}
