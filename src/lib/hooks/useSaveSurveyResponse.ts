import { createSurveyPage } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QuestionsResponsesData, SurveyPage } from "../types";
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
    }) =>
      saveSurveyResponse(payload.surveyId, payload.data, payload.collectorId),
    onSuccess(data, variables, context) {},
  });

  return {
    isPending,
    isError,
    isSuccess,
    saveResponseMutation,
    saveResponseMutationAsync,
  };
}
