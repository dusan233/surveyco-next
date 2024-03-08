import { copyQuestion } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CopyQuestionData,
  OperationPosition,
  QuestionsResponseData,
  SurveyPage,
} from "@/lib/types";
import useBuildQuestionsContext from "./useBuildQuestionsContext";

export default function useCopyQuestion() {
  const queryClient = useQueryClient();
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const setCurrentPage = useBuildQuestionsContext((s) => s.setCurrentPage);
  const setQueueQuestion = useBuildQuestionsContext((s) => s.setQueueQuestion);

  const {
    isPending,
    mutate: copyQuestionMutation,
    mutateAsync: copyQuestionMutationAsync,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (payload: {
      surveyId: string;
      questionId: string;
      data: CopyQuestionData;
    }) => copyQuestion(payload.surveyId, payload.questionId, payload.data),
    onSuccess(data, variables) {
      if (data.surveyPageId === currentPage!.id) {
        queryClient.setQueryData<QuestionsResponseData>(
          ["survey", variables.surveyId, "questions", currentPage!.id],
          (questionsData) => {
            if (questionsData) {
              const questions = questionsData.questions;
              const targetQuestion = questions.find(
                (q) => q.id === variables.data.questionId
              );
              const newQuestion = {
                ...data,
                number:
                  variables.data.position === OperationPosition.after
                    ? targetQuestion!.number + 1
                    : targetQuestion!.number,
              };
              const updatedQuestions = questions.map((q) => {
                if (q.number >= newQuestion.number)
                  return { ...q, number: q.number + 1 };
                return q;
              });
              return {
                questions: [...updatedQuestions, newQuestion].toSorted(
                  (a, b) => a.number - b.number
                ),
                page: questionsData.page,
              };
            } else {
              return;
            }
          }
        );
        setQueueQuestion(data.id);
      } else {
        const surveyPages = queryClient.getQueryData<SurveyPage[]>([
          "survey",
          variables.surveyId,
          "pages",
        ]);
        const targetPage = surveyPages?.find(
          (page) => page.id === data.surveyPageId
        );
        if (targetPage) {
          setCurrentPage(targetPage);
        }
      }
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    copyQuestionMutation,
    copyQuestionMutationAsync,
  };
}
