import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
  const { data, ...queryInfo } = useQuery({
    staleTime: options?.staleTime || 0,
    queryKey: ["survey", surveyId, "questions", pageId],
    queryFn: () => getSurveyQuestions({ surveyId, surveyPage: pageId }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    ...options,
  });

  return {
    questions: data?.questions,
    page: data?.page,
    ...queryInfo,
  };
}
