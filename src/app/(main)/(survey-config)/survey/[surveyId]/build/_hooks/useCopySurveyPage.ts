import { useMutation, useQueryClient } from "@tanstack/react-query";
import { copySurveyPage } from "@/actions/survey-actions";
import { OperationPosition } from "@/types/common";
import { SurveyPage } from "@/types/survey";

export default function useCopySurveyPage() {
  const queryClient = useQueryClient();
  const {
    mutate: copyPageMutation,
    mutateAsync: copyPageMutationAsync,
    ...mutation
  } = useMutation({
    mutationFn: (payload: {
      surveyId: string;
      sourcePageId: string;
      data: { position: OperationPosition; pageId: string };
    }) => copySurveyPage(payload.surveyId, payload.sourcePageId, payload.data),
    onSuccess(data, variables) {
      queryClient.setQueryData<SurveyPage[]>(
        ["survey", variables.surveyId, "pages"],
        (surveyPages) => {
          if (surveyPages) {
            const targetPage = surveyPages!.find(
              (page) => page.id === variables.data.pageId
            )!;
            const newPage = {
              ...data,
              number:
                variables.data.position === OperationPosition.after
                  ? targetPage.number + 1
                  : targetPage.number,
            };
            const updatedPagesNumbers = surveyPages.map((page) => {
              if (page.number >= newPage.number)
                return { ...page, number: page.number + 1 };
              return page;
            });
            const newPages = [...updatedPagesNumbers, newPage];
            newPages.sort((a, b) => a.number - b.number);
            return newPages;
          } else {
            return surveyPages;
          }
        }
      );
    },
  });

  return {
    copyPageMutation,
    copyPageMutationAsync,
    ...mutation,
  };
}
