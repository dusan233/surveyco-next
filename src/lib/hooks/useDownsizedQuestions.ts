import { getSurveyQuestions } from "@/app/actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useDownsizedQuestions(surveyId: string, page: number) {
  const { data, isLoading, isFetching, isRefetching } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "questions-downsized", page],
    queryFn: () => getSurveyQuestions(surveyId, page),
    placeholderData: keepPreviousData,
    select(data) {
      return data.questions;
    },
  });

  return { questions: data, isLoading, isFetching, isRefetching };
}
