"use client";

import { useMutation } from "@tanstack/react-query";

import { createSurveyCollector } from "@/actions/collector-actions";

export default function useCreateSurveyCollector() {
  const {
    isPending,
    mutate: createCollectorMutation,
    mutateAsync: createCollectorMutationAsync,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (payload: { surveyId: string }) => {
      return createSurveyCollector(payload.surveyId);
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    createCollectorMutation,
    createCollectorMutationAsync,
  };
}
