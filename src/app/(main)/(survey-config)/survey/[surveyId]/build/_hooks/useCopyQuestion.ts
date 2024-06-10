import { useMutation, useQueryClient } from "@tanstack/react-query";

import useBuildQuestionsContext from "./useBuildQuestionsContext";
import { copyQuestion } from "@/actions/survey-actions";
import { PlaceQuestionData, QuestionsResponseData } from "@/types/question";
import { OperationPosition } from "@/types/common";
import { SurveyPage } from "@/types/survey";

export default function useCopyQuestion() {
  const queryClient = useQueryClient();
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const setCurrentPage = useBuildQuestionsContext((s) => s.setCurrentPage);
  const setQueueQuestion = useBuildQuestionsContext((s) => s.setQueueQuestion);

  const {
    mutate: copyQuestionMutation,
    mutateAsync: copyQuestionMutationAsync,
    ...mutation
  } = useMutation({
    mutationFn: (payload: {
      surveyId: string;
      questionId: string;
      data: PlaceQuestionData;
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
              const newQuestions = [...updatedQuestions, newQuestion];
              newQuestions.sort((a, b) => a.number - b.number);
              return {
                questions: newQuestions,
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
    copyQuestionMutation,
    copyQuestionMutationAsync,
    ...mutation,
  };
}
