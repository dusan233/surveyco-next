import { moveQuestion } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CopyQuestionData } from "../types";

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
      data: CopyQuestionData;
    }) => moveQuestion(payload.surveyId, payload.questionId, payload.data),
    onSuccess(data, variables, context) {},
  });

  return {
    isPending,
    isError,
    isSuccess,
    moveQuestionMutation,
    moveQuestionMutationAsync,
  };
}
