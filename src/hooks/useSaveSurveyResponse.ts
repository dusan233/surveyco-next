import { useMutation } from "@tanstack/react-query";
import { QuestionsResponsesData } from "../lib/types";
import { saveSurveyResponse } from "@/app/_actions/survey-actions";

export default function useSaveSurveyResponse() {
  const {
    isPending,
    mutate: saveResponseMutation,
    mutateAsync: saveResponseMutationAsync,
    isError,
    isSuccess,
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
    isPending,
    isError,
    isSuccess,
    saveResponseMutation,
    saveResponseMutationAsync,
  };
}
