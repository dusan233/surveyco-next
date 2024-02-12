import { createQuestion, updateQuestion } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QuestionsResponseData, SaveQuestionData, SurveyPage } from "../types";

export default function useSaveQuestion() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: saveQuestionMutation,
    mutateAsync: saveQuestionMutationAsync,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (payload: {
      data: SaveQuestionData;
      surveyId: string;
      currentPage: SurveyPage;
    }) =>
      payload.data.id
        ? updateQuestion(payload.surveyId, payload.data)
        : createQuestion(
            payload.surveyId,
            payload.currentPage.id,
            payload.data
          ),
    onSuccess(data, variables, context) {
      queryClient.setQueryData<QuestionsResponseData>(
        [
          "survey",
          variables.surveyId,
          "questions",
          variables.currentPage.number,
        ],
        (questionsData) => {
          if (questionsData) {
            const questions = questionsData.questions;
            const isExistingQuestion = !!questions.find(
              (q) => q.id === data.id
            );

            if (isExistingQuestion) {
              const newQuestions = questions.map((question) =>
                question.id === data.id ? data : question
              );

              return { questions: newQuestions, page: questionsData.page };
            } else {
              return {
                questions: [...questions, data],
                page: questionsData.page,
              };
            }
          } else {
            return questionsData;
          }
        }
      );
    },
  });

  return { isPending, isError, isSuccess, saveQuestionMutation };
}
