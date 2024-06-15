import { useMutation } from "@tanstack/react-query";
import { saveSurveyResponse } from "@/actions/survey-actions";
import { QuestionsResponsesData } from "@/types/question";

export default function useSaveSurveyResponse() {
  const {
    mutate: saveResponseMutation,
    mutateAsync: saveResponseMutationAsync,
    ...mutation
  } = useMutation({
    mutationFn: (payload: {
      surveyId: string;
      data: QuestionsResponsesData;
      collectorId: string | null;
      pageId: string;
      isPreview: boolean;
      surveyResposneStartTime: Date;
    }) =>
      saveSurveyResponse(
        payload.surveyId,
        payload.data,
        payload.collectorId,
        payload.pageId,
        payload.surveyResposneStartTime,
        payload.isPreview
      ),
  });

  return {
    saveResponseMutation,
    saveResponseMutationAsync,
    ...mutation,
  };
}
