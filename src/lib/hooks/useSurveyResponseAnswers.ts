import { getSurveyResponseAnswers } from "@/app/actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useSurveyResponseAnswers(
  surveyId: string,
  responseId: string,
  page: number
) {
  const { data, isLoading, isFetching } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "response", responseId, "answers", page],
    queryFn: () => getSurveyResponseAnswers(surveyId, responseId, page),
    placeholderData: keepPreviousData,
  });

  return {
    questions: data?.questions,
    questionResponses: data?.questionResponses,
    isLoading,
    isFetching,
  };
}
