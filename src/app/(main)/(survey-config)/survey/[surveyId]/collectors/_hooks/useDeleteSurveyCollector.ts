"use client";

import { deleteSurveyCollector } from "@/actions/collector-actions";
import { handleServerActionRes } from "@/lib/util/serverActionUtils";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteSurveyCollector() {
  const { mutateAsync: deleteCollectorMutationAsync, ...mutation } =
    useMutation({
      mutationFn: async (payload: {
        collectorId: string;
        surveyId: string;
      }) => {
        return handleServerActionRes(() =>
          deleteSurveyCollector(payload.collectorId, payload.surveyId)
        );
      },
    });

  return {
    deleteCollectorMutationAsync,
    ...mutation,
  };
}
