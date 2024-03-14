import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CopyQuestionData,
  OperationPosition,
  Question,
  QuestionsResponseData,
  SurveyPage,
} from "@/lib/types";
import useBuildQuestionsContext from "./useBuildQuestionsContext";
import { moveQuestion } from "@/app/_actions/survey-actions";

export default function useMoveQuestion() {
  const queryClient = useQueryClient();
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const setCurrentPage = useBuildQuestionsContext((s) => s.setCurrentPage);

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
        ["survey", moveQuestion.surveyId, "questions", currentPage!.id]
      );
      const sourceQuestion = previousQuestions?.questions.find(
        (q) => q.id === moveQuestion.questionId
      );
      const targetQuestion = previousQuestions?.questions.find(
        (q) => q.id === moveQuestion.data.questionId
      ) as Question;
      console.log(sourceQuestion, targetQuestion);
      if (sourceQuestion!.surveyPageId === moveQuestion.data.pageId) {
        let updatedQuestions;

        if (sourceQuestion!.number > targetQuestion!.number) {
          const sourceQuestionNewNumber =
            moveQuestion.data.position === OperationPosition.after
              ? targetQuestion!.number + 1
              : targetQuestion!.number;

          updatedQuestions = previousQuestions!.questions.map((q) => {
            if (
              q.number < sourceQuestion!.number &&
              q.number >= sourceQuestionNewNumber
            ) {
              return { ...q, number: q.number + 1 };
            } else if (q.number === sourceQuestion!.number)
              return { ...q, number: sourceQuestionNewNumber };

            return q;
          });
        } else if (sourceQuestion!.number < targetQuestion!.number) {
          const sourceQuestionNewNumber =
            moveQuestion.data.position === OperationPosition.after
              ? targetQuestion!.number
              : targetQuestion!.number - 1;

          updatedQuestions = previousQuestions!.questions.map((q) => {
            if (
              q.number > sourceQuestion!.number &&
              q.number <= sourceQuestionNewNumber
            ) {
              return { ...q, number: q.number - 1 };
            } else if (q.number === sourceQuestion!.number)
              return { ...q, number: sourceQuestionNewNumber };
            return q;
          });
        }

        queryClient.setQueryData<QuestionsResponseData>(
          ["survey", moveQuestion.surveyId, "questions", currentPage!.id],
          {
            questions: updatedQuestions!.toSorted(
              (a, b) => a.number - b.number
            ),
            page: previousQuestions!.page,
          }
        );
      }

      return { previousQuestions };
    },
    onSuccess(data, variables) {
      const previousQuestions = queryClient.getQueryData<QuestionsResponseData>(
        ["survey", variables.surveyId, "questions", currentPage!.id]
      );
      const sourceQuestion = previousQuestions?.questions.find(
        (q) => q.id === variables.questionId
      );

      if (sourceQuestion!.surveyPageId === data.surveyPageId) return;

      const surveyPages = queryClient.getQueryData<SurveyPage[]>([
        "survey",
        variables.surveyId,
        "pages",
      ]);
      const targetPage = surveyPages?.find(
        (page) => page.id === data.surveyPageId
      );
      if (targetPage) {
        setCurrentPage(targetPage);
      }
    },
    onError(_, variables, context) {
      queryClient.setQueryData<QuestionsResponseData>(
        ["survey", variables.surveyId, "questions", currentPage!.id],
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
