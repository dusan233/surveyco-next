import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSurveyQuestionsAndResponses } from "../_api/survey";

export default function useQuestionsAndResponses(
  surveyId: string,
  collectorId: string,
  pageId: string
) {
  const { data, isLoading, isFetching, isRefetching, isError } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "questions-responses", pageId],
    queryFn: () =>
      getSurveyQuestionsAndResponses(surveyId, collectorId, pageId),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    questions: data?.questions,
    questionResponses: data?.questionResponses,
    page: data?.page,
    isLoading,
    isFetching,
    isRefetching,
    isError,
  };
}
