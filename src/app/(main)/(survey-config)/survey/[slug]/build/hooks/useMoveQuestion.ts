import { moveQuestion } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CopyQuestionData, Question, QuestionsResponseData } from "@/lib/types";

export default function useMoveQuestion() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: moveQuestionMutation,
    mutateAsync: moveQuestionMutationAsync,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (payload: {
      surveyId: string;
      questionId: string;
      pageNumber: number;
      data: CopyQuestionData;
    }) => moveQuestion(payload.surveyId, payload.questionId, payload.data),
    onMutate(moveQuestion) {
      const previousQuestions = queryClient.getQueryData<QuestionsResponseData>(
        ["survey", moveQuestion.surveyId, "questions", moveQuestion.pageNumber]
      );
      const sourceQuestion = previousQuestions?.questions.find(
        (q) => q.id === moveQuestion.questionId
      );
      const targetQuestion = previousQuestions?.questions.find(
        (q) => q.id === moveQuestion.data.questionId
      ) as Question;

      let updatedNumbersQuestions;
      if (sourceQuestion!.number > targetQuestion.number) {
        updatedNumbersQuestions = previousQuestions!.questions.map((q) => {
          if (
            q.number >= targetQuestion.number &&
            q.number < sourceQuestion!.number
          ) {
            return { ...q, number: q.number + 1 };
          }
          if (q.number === sourceQuestion!.number)
            return { ...q, number: targetQuestion.number };
          return q;
        });

        updatedNumbersQuestions.sort((a, b) => a.number - b.number);
      } else {
        updatedNumbersQuestions = previousQuestions!.questions.map((q) => {
          if (
            q.number > sourceQuestion!.number &&
            q.number <= targetQuestion.number
          ) {
            return { ...q, number: q.number - 1 };
          }
          if (q.number === sourceQuestion!.number)
            return { ...q, number: targetQuestion.number };
          return q;
        });
        updatedNumbersQuestions.sort((a, b) => a.number - b.number);
      }

      queryClient.setQueryData<QuestionsResponseData>(
        ["survey", moveQuestion.surveyId, "questions", moveQuestion.pageNumber],
        { questions: updatedNumbersQuestions, page: previousQuestions!.page }
      );

      return { previousQuestions };
    },
    onError(_, variables, context) {
      queryClient.setQueryData<QuestionsResponseData>(
        ["survey", variables.surveyId, "questions", variables.pageNumber],
        context?.previousQuestions
      );
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    moveQuestionMutation,
    moveQuestionMutationAsync,
  };
}
