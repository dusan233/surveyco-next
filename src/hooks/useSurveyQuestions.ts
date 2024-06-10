import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useToastError from "./useToastError";
import { getSurveyQuestions } from "@/api/survey";

export default function useSurveyQuestions(
  surveyId: string,
  pageId: string,
  options?: {
    staleTime?: number;
    refetchOnMount?: boolean;
    refetchOnWindowFocus?: boolean;
    enabled?: boolean;
  }
) {
  const { data, isLoading, isFetching, isRefetching, isError } = useQuery({
    staleTime: options?.staleTime || 0,
    queryKey: ["survey", surveyId, "questions", pageId],
    queryFn: () => getSurveyQuestions({ surveyId, surveyPage: pageId }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    ...options,
  });

  useToastError(isError);

  return {
    questions: data?.questions,
    page: data?.page,
    isLoading,
    isFetching,
    isRefetching,
    isError,
  };
}
