import { saveQuestion } from "@/app/actions";
import { useMutation } from "@tanstack/react-query";
import { SaveQuestionData } from "../types";

export default function useSaveQuestion(surveyId: string) {
  const {
    isPending,
    mutate: saveQuestionMutation,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (questionData: SaveQuestionData) =>
      saveQuestion(surveyId, questionData),
    onSuccess(data, variables, context) {
      console.log(data, "data posle uspeha");
    },
  });

  return { isPending, isError, isSuccess, saveQuestionMutation };
}
