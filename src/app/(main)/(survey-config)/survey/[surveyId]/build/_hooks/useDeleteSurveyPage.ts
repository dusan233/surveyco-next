import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSurveyPage } from "@/actions/survey-actions";
import { SurveyPage } from "@/types/survey";
import { handleServerActionRes } from "@/lib/util/serverActionUtils";

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
      handleServerActionRes(() =>
        deleteSurveyPage(payload.surveyId, payload.pageId)
      ),
    onSuccess(_, variables) {
      queryClient.setQueryData<SurveyPage[]>(
        ["survey", variables.surveyId, "pages"],
        (surveyPages) => {
          if (surveyPages) {
            return surveyPages
              .filter((page) => page.id !== variables.pageId)
              .map((page) => {
                const deletedPage = surveyPages.find(
                  (page) => page.id === variables.pageId
                )!;
                if (page.number > deletedPage.number) {
                  return { ...page, number: page.number - 1 };
                }
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
