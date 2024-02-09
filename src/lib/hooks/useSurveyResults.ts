import { getQuestionResults } from "@/app/actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useQuestionResults = (surveyId: string, page: number) => {
  const { data, error, isFetching, status } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "questions", "results", page],
    queryFn: () => getQuestionResults(surveyId, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const questionResults = data;
  return {
    questionResults,
    error,
    isFetching,
    status,
  };
};
