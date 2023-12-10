import { deleteSurveyPage } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SurveyPage } from "../types";

export default function useDeleteSurveyPage() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: deletePageMutation,
    mutateAsync: deletePageMutationAsync,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (payload: { surveyId: string; pageId: string }) =>
      deleteSurveyPage(payload.surveyId, payload.pageId),
    onSuccess(data, variables, context) {
      queryClient.setQueryData<SurveyPage[]>(
        ["survey", variables.surveyId, "pages"],
        (surveyPages) => {
          if (surveyPages) {
            return surveyPages.filter((page) => page.id !== variables.pageId);
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
    deletePageMutation,
    deletePageMutationAsync,
  };
}
