import { deleteQuestion } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QuestionsResponseData, SurveyPage } from "../types";

export default function useDeleteQuestion(currentPage: SurveyPage) {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: deleteQuestionMutation,
    mutateAsync: deleteQuestionMutationAsync,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (questionPayload: { surveyId: string; questionId: string }) =>
      deleteQuestion(questionPayload.surveyId, questionPayload.questionId),
    onSuccess(data, variables, context) {
      queryClient.setQueryData<QuestionsResponseData>(
        ["survey", variables.surveyId, "questions", currentPage.number],
        (questionsData) => {
          if (questionsData) {
            const questions = questionsData.questions;
            const filteredQuestions = questions.filter(
              (question) => question.id !== variables.questionId
            );
            return { questions: filteredQuestions };
          } else {
            return questionsData;
          }
        }
      );
    },
    onError(error, variables, context) {
      console.log(error, "dudu");
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    deleteQuestionMutation,
    deleteQuestionMutationAsync,
  };
}
