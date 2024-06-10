"use client";

import { deleteSurveyCollector } from "@/actions/collector-actions";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteSurveyCollector() {
  const {
    mutate: deleteCollectorMutation,
    mutateAsync: deleteCollectorMutationAsync,
    ...mutation
  } = useMutation({
    mutationFn: async (payload: { collectorId: string; surveyId: string }) => {
      return deleteSurveyCollector(payload.collectorId, payload.surveyId);
    },
  });

  return {
    deleteCollectorMutation,
    deleteCollectorMutationAsync,
    ...mutation,
  };
}
