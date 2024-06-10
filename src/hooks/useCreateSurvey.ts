"use client";

import { createSurvey } from "@/actions/survey-actions";
import { SurveyCategory } from "@/types/survey";
import { useMutation } from "@tanstack/react-query";

export default function useCreateSurvey() {
  const {
    mutate: createSurveyMutation,
    mutateAsync: createSurveyMutationAsync,
    ...mutation
  } = useMutation({
    mutationFn: async (payload: {
      title: string;
      category?: SurveyCategory;
    }) => {
      return createSurvey({ title: payload.title, category: payload.category });
    },
  });

  return {
    ...mutation,
    createSurveyMutation,
    createSurveyMutationAsync,
  };
}
