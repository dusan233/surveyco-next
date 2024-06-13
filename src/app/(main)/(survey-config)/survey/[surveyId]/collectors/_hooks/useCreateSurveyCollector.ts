"use client";

import { useMutation } from "@tanstack/react-query";

import { createSurveyCollector } from "@/actions/collector-actions";
import { handleServerActionRes } from "@/lib/util/serverActionUtils";

export default function useCreateSurveyCollector() {
  const {
    mutate: createCollectorMutation,
    mutateAsync: createCollectorMutationAsync,
    ...mutation
  } = useMutation({
    mutationFn: async (payload: { surveyId: string }) => {
      return handleServerActionRes(() =>
        createSurveyCollector(payload.surveyId)
      );
    },
  });

  return {
    createCollectorMutation,
    createCollectorMutationAsync,
    ...mutation,
  };
}
