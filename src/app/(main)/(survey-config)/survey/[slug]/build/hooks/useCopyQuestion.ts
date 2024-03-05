import { copyQuestion } from "@/app/actions";
import { useMutation } from "@tanstack/react-query";
import { CopyQuestionData } from "@/lib/types";

export default function useCopyQuestion() {
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
  });

  return {
    isPending,
    isError,
    isSuccess,
    copyQuestionMutation,
    copyQuestionMutationAsync,
  };
}
