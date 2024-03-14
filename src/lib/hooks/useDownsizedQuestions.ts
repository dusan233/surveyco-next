import { getSurveyQuestions } from "@/app/_actions/survey-actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useDownsizedQuestions(
  surveyId: string,
  pageId: string
) {
  const { data, isLoading, isFetching, isRefetching } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "questions-downsized", pageId],
    queryFn: () => getSurveyQuestions(surveyId, pageId),
    placeholderData: keepPreviousData,
    select(data) {
      return data.questions;
    },
  });

  return { questions: data, isLoading, isFetching, isRefetching };
}
