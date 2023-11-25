import { getSurveyQuestions } from "@/app/actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useSurveyQuestions(surveyId: string, page: number) {
  const { data, isLoading, isFetching } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "questions", page],
    queryFn: () => getSurveyQuestions(surveyId, page),
    placeholderData: keepPreviousData,
  });

  return { questions: data?.questions, isLoading, isFetching };
}
