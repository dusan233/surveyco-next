import { saveQuestion } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Question, QuestionsResponseData, SaveQuestionData } from "../types";
import { useContext } from "react";
import { QuestionsListContext } from "../context";

export default function useSaveQuestion(surveyId: string) {
  const { setCanSelectQuestion } = useContext(QuestionsListContext);
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
      setCanSelectQuestion(true);
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
