"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SurveyPage } from "@/lib/types";
import { createSurveyPage } from "@/app/_actions/survey-actions";

export default function useCreateSurveyPage() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: createPageMutation,
    mutateAsync: createPageMutationAsync,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (payload: { surveyId: string }) => {
      return createSurveyPage(payload.surveyId);
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
    isPending,
    isError,
    isSuccess,
    createPageMutation,
    createPageMutationAsync,
  };
}
