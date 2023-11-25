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
            const deletedQuestion = questions.find(
              (question) => question.id === variables.questionId
            )!;
            const updatedQuestions = questions
              .filter((question) => question.id !== variables.questionId)
              .map((question) => {
                if (question.number > deletedQuestion.number)
                  return { ...question, number: question.number - 1 };
                return question;
              });
            return { questions: updatedQuestions };
          } else {
            return questionsData;
          }
        }
      );
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
