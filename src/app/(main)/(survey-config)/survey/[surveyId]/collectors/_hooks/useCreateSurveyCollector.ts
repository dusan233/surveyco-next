"use client";

import { useMutation } from "@tanstack/react-query";

import { createSurveyCollector } from "@/actions/collector-actions";
import { handleServerActionRes } from "@/lib/util/serverActionUtils";

export default function useCreateSurveyCollector() {
  const { mutateAsync: createCollectorMutationAsync, ...mutation } =
    useMutation({
      mutationFn: async (payload: { surveyId: string }) => {
        return handleServerActionRes(() =>
          createSurveyCollector(payload.surveyId)
        );
      },
    });

  return {
    createCollectorMutationAsync,
    ...mutation,
  };
}
