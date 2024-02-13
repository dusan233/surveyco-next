import { getSurveyQuestions } from "@/app/actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useToastError from "./useToastError";

export default function useSurveyQuestions(
  surveyId: string,
  page: number,
  options?: {
    refetchOnMount?: boolean;
    refetchOnWindowFocus?: boolean;
  }
) {
  const { data, isLoading, isFetching, isRefetching, isError } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "questions", page],
    queryFn: () => getSurveyQuestions(surveyId, page),
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
