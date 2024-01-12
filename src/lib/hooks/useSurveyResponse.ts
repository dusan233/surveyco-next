import { getSurveyResponse } from "@/app/actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useSurveyResponse(
  surveyId: string,
  responseId: string
) {
  const { data, isLoading, isFetching } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "response", responseId],
    queryFn: () => getSurveyResponse(surveyId, responseId),
    placeholderData: keepPreviousData,
  });

  return {
    surveyResponse: data,
    isLoading,
    isFetching,
  };
}
