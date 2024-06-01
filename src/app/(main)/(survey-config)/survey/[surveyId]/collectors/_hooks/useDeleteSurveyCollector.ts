"use client";

import { deleteSurveyCollector } from "@/actions/collector-actions";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteSurveyCollector() {
  const {
    isPending,
    mutate: deleteCollectorMutation,
    mutateAsync: deleteCollectorMutationAsync,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (payload: { collectorId: string; surveyId: string }) => {
      return deleteSurveyCollector(payload.collectorId, payload.surveyId);
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    deleteCollectorMutation,
    deleteCollectorMutationAsync,
  };
}
