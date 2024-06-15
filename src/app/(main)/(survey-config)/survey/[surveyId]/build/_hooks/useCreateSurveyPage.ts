"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSurveyPage } from "@/actions/survey-actions";
import { SurveyPage } from "@/types/survey";
import { handleServerActionRes } from "@/lib/util/serverActionUtils";

export default function useCreateSurveyPage() {
  const queryClient = useQueryClient();
  const { mutateAsync: createPageMutationAsync, ...mutation } = useMutation({
    mutationFn: async (payload: { surveyId: string }) => {
      return handleServerActionRes(() => createSurveyPage(payload.surveyId));
    },
    onSuccess(data, variables) {
      queryClient.setQueryData<SurveyPage[]>(
        ["survey", variables.surveyId, "pages"],
        (surveyPages) => {
          if (surveyPages) {
            const newPage = { ...data, number: surveyPages!.length + 1 };
            return [...surveyPages, newPage];
          } else {
            return surveyPages;
          }
        }
      );
    },
  });

  return {
    createPageMutationAsync,
    ...mutation,
  };
}
