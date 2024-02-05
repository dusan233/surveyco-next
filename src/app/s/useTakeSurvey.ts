import useQuestionsAndResponses from "@/lib/hooks/useQuestionsAndResponses";
import useSurveyPages from "@/lib/hooks/useSurveyPages";
import { Question, QuestionType, QuestionsResponsesData } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useTakeSurvey(
  surveyId: string,
  collectorId: string,
  surveyResposneStartTime: Date
) {
  const queryClient = useQueryClient();
  const { replace } = useRouter();
  const [selectedPageNum, setSelectedPageNum] = useState(1);
  const [startTime, setStartTime] = useState(surveyResposneStartTime);
  const [showSurveyModifiedDialog, setShowSurveyModifiedDialog] =
    useState(false);

  const { surveyPages } = useSurveyPages(surveyId);
  const { questions, questionResponses, page, isFetching } =
    useQuestionsAndResponses(surveyId, collectorId, selectedPageNum);

  const resetSurveyStartTime = () => {
    setStartTime(new Date());
  };

  const getInitialQuestionAnswer = (question: Question) => {
    const questionRes = questionResponses!.find(
      (qRes) => qRes.questionId === question.id
    );

    if (!questionRes)
      return question.type === QuestionType.checkboxes ? ([] as string[]) : "";

    return question.type === QuestionType.checkboxes
      ? questionRes.answer.map((answer) => answer.questionOptionId!)
      : question.type === QuestionType.textbox
      ? questionRes.answer[0].textAnswer!
      : questionRes.answer[0].questionOptionId!;
  };

  const getInitialQuestionResponses = () => {
    return questions!.map((question) => {
      const questionResponse = questionResponses!.find(
        (qRes) => qRes.questionId === question.id
      );

      return {
        ...(questionResponse &&
          questionResponse.id && { id: questionResponse.id }),
        questionId: question.id,
        required: question.required,
        answer: getInitialQuestionAnswer(question),
        questionType: question.type,
      };
    });
  };
  const clearPagesCachedData = useCallback(
    (discludeCurrentPage: boolean = false) => {
      queryClient.removeQueries({
        predicate(query) {
          const queryKey = query.queryKey;

          const condition =
            queryKey[0] === "survey" &&
            queryKey[1] === surveyId &&
            queryKey[2] === "questions-responses" &&
            (discludeCurrentPage ? queryKey[3] !== page : true);

          if (condition) {
            return true;
          }

          return false;
        },
      });
    },
    [queryClient, page, surveyId]
  );

  const handleSurveyDataChanged = () => {
    clearPagesCachedData();
    setShowSurveyModifiedDialog(true);
    setSelectedPageNum(1);
    resetSurveyStartTime();
  };
  const handleSuccessfullPageSubmission = (
    _: QuestionsResponsesData,
    submitted: boolean
  ) => {
    if (submitted) {
      replace("/survey-thanks");
    } else {
      setSelectedPageNum((selectedPageNum) => selectedPageNum + 1);
    }
  };

  const handlePreviousPage = () => {
    setSelectedPageNum((selectedPageNum) => selectedPageNum - 1);
  };

  //after selected page successfully loads clear previous pages cashed data.
  useEffect(() => {
    if (questions && page && questionResponses) {
      clearPagesCachedData(true);
    }
  }, [questions, page, clearPagesCachedData, questionResponses]);

  return {
    questions,
    surveyPages,
    questionResponses,
    isFetching,
    handlePreviousPage,
    handleSuccessfullPageSubmission,
    handleSurveyDataChanged,
    getInitialQuestionResponses,
    page,
    showSurveyModifiedDialog,
    setShowSurveyModifiedDialog,
    startTime,
  };
}
