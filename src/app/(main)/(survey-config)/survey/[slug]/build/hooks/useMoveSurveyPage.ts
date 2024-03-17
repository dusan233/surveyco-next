import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OperationPosition, SurveyPage } from "@/lib/types";
import { moveSurveyPage } from "@/app/_actions/survey-actions";

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
            const sourcePage = surveyPages.find(
              (page) => page.id === variables.sourcePageId
            )!;
            const targetPage = surveyPages.find(
              (page) => page.id === variables.data.pageId
            )!;
            if (sourcePage.number > targetPage.number) {
              const newPageNumber =
                variables.data.position === OperationPosition.after
                  ? targetPage.number + 1
                  : targetPage.number;

              const updatedSurveyPages = surveyPages
                .map((page) => {
                  if (
                    page.number >= newPageNumber &&
                    page.number < sourcePage.number
                  ) {
                    return { ...page, number: page.number + 1 };
                  }
                  return page;
                })
                .map((page) =>
                  page.id === data.id
                    ? { ...page, number: newPageNumber }
                    : page
                );

              updatedSurveyPages.sort((p1, p2) => p1.number - p2.number);

              return updatedSurveyPages;
            } else if (targetPage.number > sourcePage.number) {
              const newPageNumber =
                variables.data.position === OperationPosition.after
                  ? targetPage.number
                  : targetPage.number - 1;
              const updatedSurveyPages = surveyPages
                .map((page) => {
                  if (
                    page.number > sourcePage.number &&
                    page.number <= newPageNumber
                  ) {
                    return { ...page, number: page.number - 1 };
                  }
                  return page;
                })
                .map((page) =>
                  page.id === data.id
                    ? { ...page, number: newPageNumber }
                    : page
                );

              updatedSurveyPages.sort((p1, p2) => p1.number - p2.number);
              return updatedSurveyPages;
            } else if (sourcePage.number === targetPage.number) {
              return surveyPages;
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
