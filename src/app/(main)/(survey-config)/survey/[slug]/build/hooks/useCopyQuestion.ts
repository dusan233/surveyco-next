import { copyQuestion } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CopyQuestionData } from "../types";

export default function useCopyQuestion() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: copyQuestionMutation,
    mutateAsync: copyQuestionMutationAsync,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (payload: {
      surveyId: string;
      questionId: string;
      data: CopyQuestionData;
    }) => copyQuestion(payload.surveyId, payload.questionId, payload.data),
    onSuccess(data, variables, context) {},
  });

  return {
    isPending,
    isError,
    isSuccess,
    copyQuestionMutation,
    copyQuestionMutationAsync,
  };
}
