"use client";

import { createSurvey } from "@/actions/survey-actions";
import { handleServerActionRes } from "@/lib/util/serverActionUtils";
import { SurveyCategory } from "@/types/survey";
import { useMutation } from "@tanstack/react-query";

export default function useCreateSurvey() {
  const { mutateAsync: createSurveyMutationAsync, ...mutation } = useMutation({
    mutationFn: async (payload: {
      title: string;
      category?: SurveyCategory;
    }) => {
      return handleServerActionRes(() =>
        createSurvey({
          title: payload.title,
          category: payload.category,
        })
      );
    },
  });

  return {
    ...mutation,
    createSurveyMutationAsync,
  };
}
