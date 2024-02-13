import { createSurveyPage } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SurveyPage } from "@/lib/types";

export default function useCreateSurveyPage() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: createPageMutation,
    mutateAsync: createPageMutationAsync,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (payload: { surveyId: string }) =>
      createSurveyPage(payload.surveyId),
    onSuccess(data, variables) {
      queryClient.setQueryData<SurveyPage[]>(
        ["survey", variables.surveyId, "pages"],
        (surveyPages) => {
          if (surveyPages) {
            return [...surveyPages, data];
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
