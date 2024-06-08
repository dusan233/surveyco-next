"use client";

import { updateSurveyCollectorStatus } from "@/actions/collector-actions";
import { CollectorStatus } from "@/types/collector";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateCollectorStatus() {
  const {
    isPending,
    mutate: updateCollectorStatusMutation,
    mutateAsync: updateCollectorStatusMutationAsync,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (payload: {
      collectorId: string;
      status: CollectorStatus;
    }) => {
      return updateSurveyCollectorStatus(payload.collectorId, payload.status);
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    updateCollectorStatusMutation,
    updateCollectorStatusMutationAsync,
  };
}