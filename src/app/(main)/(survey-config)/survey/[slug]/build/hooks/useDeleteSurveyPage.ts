import { deleteSurveyPage } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SurveyPage } from "@/lib/types";

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
    onSuccess(_, variables) {
      queryClient.setQueryData<SurveyPage[]>(
        ["survey", variables.surveyId, "pages"],
        (surveyPages) => {
          if (surveyPages) {
            const deletedPageNumber = surveyPages.find(
              (page) => page.id === variables.pageId
            )!.number;
            return surveyPages
              .filter((page) => page.id !== variables.pageId)
              .map((page) => {
                if (page.number > deletedPageNumber)
                  return { ...page, number: page.number - 1 };
                return page;
              });
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
