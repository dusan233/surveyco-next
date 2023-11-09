import { saveQuestion } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Question, QuestionsResponseData, SaveQuestionData } from "../types";

export default function useSaveQuestion(surveyId: string) {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: saveQuestionMutation,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (questionData: SaveQuestionData) =>
      saveQuestion(surveyId, questionData),
    onSuccess(data, variables, context) {
      queryClient.setQueryData<QuestionsResponseData>(
        ["survey", surveyId, "questions"],
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
              console.log(newQuestions, "gugugu");
              return { questions: newQuestions };
            } else {
              return { questions: [...questions, data] };
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
