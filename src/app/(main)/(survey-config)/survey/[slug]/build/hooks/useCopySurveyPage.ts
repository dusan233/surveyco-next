import { copySurveyPage } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OperationPosition, SurveyPage } from "@/lib/types";

export default function useCopySurveyPage() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: copyPageMutation,
    mutateAsync: copyPageMutationAsync,
    isError,
    isSuccess,
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
            return [...updatedPagesNumbers, newPage].toSorted(
              (a, b) => a.number - b.number
            );
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
    copyPageMutation,
    copyPageMutationAsync,
  };
}
