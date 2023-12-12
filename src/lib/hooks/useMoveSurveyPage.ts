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
            const sourcePageNumber = surveyPages.find(
              (page) => page.id === variables.sourcePageId
            )!.number;
            const targetPageNumber = surveyPages.find(
              (page) => page.id === variables.data.pageId
            )!.number;

            if (sourcePageNumber > targetPageNumber) {
              return surveyPages
                .map((page) => {
                  if (
                    page.number >= data.number &&
                    page.number < sourcePageNumber
                  ) {
                    return { ...page, number: page.number + 1 };
                  }

                  return page;
                })
                .map((page) =>
                  page.id === data.id ? { ...page, number: data.number } : page
                )
                .toSorted((p1, p2) => p1.number - p2.number);
            } else {
              const changedSurveyPages = surveyPages
                .map((page) => {
                  if (
                    page.number <= data.number &&
                    sourcePageNumber < page.number
                  ) {
                    return { ...page, number: page.number - 1 };
                  }

                  return page;
                })
                .map((page) =>
                  page.id === data.id ? { ...page, number: data.number } : page
                )
                .toSorted((p1, p2) => p1.number - p2.number);

              return changedSurveyPages;
            }
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
