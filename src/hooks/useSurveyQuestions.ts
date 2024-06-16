import {
  UndefinedInitialDataOptions,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { getSurveyQuestions } from "@/api/survey";
import { QuestionsResponseData } from "@/types/question";

export default function useSurveyQuestions(
  surveyId: string,
  pageId: string,
  options?: Omit<
    UndefinedInitialDataOptions<
      QuestionsResponseData,
      Error,
      QuestionsResponseData,
      string[]
    >,
    "queryKey" | "queryFn"
  >
) {
  const { data, ...queryInfo } = useQuery({
    staleTime: 0,
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
