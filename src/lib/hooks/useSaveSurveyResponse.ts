import { useMutation } from "@tanstack/react-query";
import { QuestionsResponsesData } from "../types";
import { saveSurveyResponse } from "@/app/api";

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
      collectorId: string;
      pageId: string;
      submit: boolean;
      surveyResposneStartTime: Date;
    }) =>
      saveSurveyResponse(
        payload.surveyId,
        payload.data,
        payload.collectorId,
        payload.pageId,
        payload.submit,
        payload.surveyResposneStartTime
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
