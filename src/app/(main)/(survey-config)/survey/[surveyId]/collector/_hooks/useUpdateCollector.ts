"use client";

import { updateSurveyCollector } from "@/actions/collector-actions";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateCollector() {
  const {
    mutate: updateCollectorMutation,
    mutateAsync: updateCollectorMutationAsync,
    ...rest
  } = useMutation({
    mutationFn: async (payload: { collectorId: string; name: string }) => {
      return updateSurveyCollector(payload.collectorId, payload.name);
    },
  });

  return {
    ...rest,
    updateCollectorMutation,
    updateCollectorMutationAsync,
  };
}
