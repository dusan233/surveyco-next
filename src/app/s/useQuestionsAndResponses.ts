import { getSurveyQuestionsAndResponses } from "@/app/actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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
