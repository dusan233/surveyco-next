import { moveSurveyPage } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OperationPosition, SurveyPage } from "../types";

export default function useMoveSurveyPage() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: movePageMutation,
    mutateAsync: movePageMutationAsync,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (payload: {
      surveyId: string;
      sourcePageId: string;
      data: { position: OperationPosition; pageId: string };
    }) => moveSurveyPage(payload.surveyId, payload.sourcePageId, payload.data),
    onSuccess(data, variables) {
      queryClient.setQueryData<SurveyPage[]>(
        ["survey", variables.surveyId, "pages"],
        (surveyPages) => {
          if (surveyPages) {
            // write the logic
            return surveyPages;
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
    movePageMutation,
    movePageMutationAsync,
  };
}
