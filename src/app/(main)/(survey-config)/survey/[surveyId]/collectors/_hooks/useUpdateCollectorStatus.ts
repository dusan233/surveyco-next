"use client";

import { updateSurveyCollectorStatus } from "@/actions/collector-actions";
import { handleServerActionRes } from "@/lib/util/serverActionUtils";
import { CollectorStatus } from "@/types/collector";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateCollectorStatus() {
  const { mutateAsync: updateCollectorStatusMutationAsync, ...mutation } =
    useMutation({
      mutationFn: async (payload: {
        collectorId: string;
        status: CollectorStatus;
      }) => {
        return handleServerActionRes(() =>
          updateSurveyCollectorStatus(payload.collectorId, payload.status)
        );
      },
    });

  return {
    updateCollectorStatusMutationAsync,
    ...mutation,
  };
}
