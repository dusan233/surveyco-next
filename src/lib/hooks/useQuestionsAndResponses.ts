import { getSurveyQuestionsAndResponses } from "@/app/actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useQuestionsAndResponses(
  surveyId: string,
  collectorId: string,
  page: number
) {
  const { data, isLoading, isFetching, isRefetching } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "questions-responses", page],
    queryFn: () => getSurveyQuestionsAndResponses(surveyId, collectorId, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    questions: data?.questions,
    questionResponses: data?.questionResponses,
    isLoading,
    isFetching,
    isRefetching,
  };
}
