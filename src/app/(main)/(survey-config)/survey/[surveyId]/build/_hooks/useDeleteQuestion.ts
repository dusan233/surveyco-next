import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestion } from "@/actions/survey-actions";
import { SurveyPage } from "@/types/survey";
import { QuestionsResponseData } from "@/types/question";
import { handleServerActionRes } from "@/lib/util/serverActionUtils";

export default function useDeleteQuestion(currentPage: SurveyPage) {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteQuestionMutationAsync, ...mutation } = useMutation(
    {
      mutationFn: (questionPayload: { surveyId: string; questionId: string }) =>
        handleServerActionRes(() =>
          deleteQuestion(questionPayload.surveyId, questionPayload.questionId)
        ),
      onSuccess(_, variables) {
        queryClient.setQueryData<QuestionsResponseData>(
          ["survey", variables.surveyId, "questions", currentPage.id],
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
              return { questions: updatedQuestions, page: questionsData.page };
            } else {
              return;
            }
          }
        );
      },
    }
  );

  return {
    deleteQuestionMutationAsync,
    ...mutation,
  };
}
