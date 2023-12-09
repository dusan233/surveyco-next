import { createQuestion, saveQuestion, updateQuestion } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Question,
  QuestionsResponseData,
  SaveQuestionData,
  SurveyPage,
} from "../types";
import { useContext } from "react";
import { QuestionsListContext } from "../context";

export default function useSaveQuestion() {
  const { setCanSelectQuestion, setAddingQuestion, setPendingQuestion } =
    useContext(QuestionsListContext);
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
      console.log(data, "Ovo mora da je ovde da vidimop sta i kako.");
      setCanSelectQuestion(true);
      setAddingQuestion(false);
      setPendingQuestion(data.id);
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
