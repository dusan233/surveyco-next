"use client";

import { updateSurveyCollector } from "@/actions/collector-actions";
import { handleServerActionRes } from "@/lib/util/serverActionUtils";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateCollector() {
  const {
    mutate: updateCollectorMutation,
    mutateAsync: updateCollectorMutationAsync,
    ...mutation
  } = useMutation({
    mutationFn: async (payload: { collectorId: string; name: string }) => {
      return handleServerActionRes(() =>
        updateSurveyCollector(payload.collectorId, payload.name)
      );
    },
  });

  return {
    ...mutation,
    updateCollectorMutation,
    updateCollectorMutationAsync,
  };
}
