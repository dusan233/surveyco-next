import { getPageQuestionResults } from "@/api/survey";
import { useAuth } from "@clerk/nextjs";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export const useQuestionResults = (surveyId: string, pageId: string) => {
  const { getToken } = useAuth();
  const { data, error, isFetching, status, isError } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "questions", "results", pageId],
    queryFn: async () => {
      const token = await getToken();
      return getPageQuestionResults({ surveyId, pageId, token });
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const lastSuccessData = useRef(data);

  useEffect(() => {
    if (data) lastSuccessData.current = data;
  }, [data]);

  const questionResults = data;
  return {
    questionResults,
    lastSuccessData,
    error,
    isError,
    isFetching,
    status,
  };
};
