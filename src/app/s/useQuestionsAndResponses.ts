import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSurveyQuestionsAndResponses } from "../../actions/survey-actions";
import { handleServerActionRes } from "@/lib/util/serverActionUtils";

export default function useQuestionsAndResponses(
  surveyId: string,
  collectorId: string,
  pageId: string
) {
  const { data, ...queryInfo } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "questions-responses", pageId],
    queryFn: () =>
      handleServerActionRes(() =>
        getSurveyQuestionsAndResponses(surveyId, collectorId, pageId)
      ),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    questions: data?.questions,
    questionResponses: data?.questionResponses,
    page: data?.page,
    ...queryInfo,
  };
}
