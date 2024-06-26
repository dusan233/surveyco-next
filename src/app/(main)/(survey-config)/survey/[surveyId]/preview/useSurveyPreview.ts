import useSurveyPages from "@/hooks/useSurveyPages";
import useSurveyQuestions from "@/hooks/useSurveyQuestions";

import {
  QuestionResponseData,
  QuestionType,
  QuestionsResponsesData,
} from "@/types/question";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

export default function useSurveyPreview(surveyId: string) {
  const queryClient = useQueryClient();
  const [isPreviewFinished, setIsPreviewFinished] = useState(false);
  const [selectedPageNum, setSelectedPageNum] = useState(1);
  const [surveyResposneStartTime, setSurveyResponseStartTime] = useState(
    new Date()
  );
  const {
    surveyPages,
    isLoading: loadingPages,
    isError: isPagesError,
  } = useSurveyPages(surveyId);
  const fristPageId = surveyPages?.find(
    (page) => page.number === selectedPageNum
  )!.id!;
  const {
    questions,
    page,
    isLoading: loadingQuestions,
    isFetching,
    isError: isQuestionsError,
  } = useSurveyQuestions(surveyId, fristPageId, {
    refetchOnWindowFocus: false,
    enabled: !!surveyPages,
  });
  const [questionsResponses, setQuestionsResponses] = useState<
    {
      pageNum: number;
      questionsResponses: QuestionResponseData[];
    }[]
  >([]);
  const isError = isQuestionsError || isPagesError;

  const saveQuestionsResponsesData = (
    questionsResponsesData: QuestionResponseData[]
  ) => {
    setQuestionsResponses((currentQuestionsResponses) => {
      const pageQuestionsResponsesExist = currentQuestionsResponses.find(
        (page) => page.pageNum === selectedPageNum
      );

      if (pageQuestionsResponsesExist) {
        return currentQuestionsResponses.map((page) => {
          if (page.pageNum === selectedPageNum)
            return { ...page, questionsResponses: questionsResponsesData };
          return page;
        });
      } else {
        return [
          ...currentQuestionsResponses,
          {
            pageNum: selectedPageNum,
            questionsResponses: questionsResponsesData,
          },
        ];
      }
    });
  };

  const clearPagesCachedData = useCallback(
    (discludeCurrentPage: boolean = false) => {
      queryClient.resetQueries({
        predicate(query) {
          const queryKey = query.queryKey;
          const condition =
            queryKey[0] === "survey" &&
            queryKey[1] === surveyId &&
            queryKey[2] === "questions" &&
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

  const restartPreview = () => {
    setIsPreviewFinished(false);
    setSelectedPageNum(1);
    clearPagesCachedData();
    setQuestionsResponses([]);
    setSurveyResponseStartTime(new Date());
  };

  const getInitialQuestionResponses = useCallback(() => {
    const pageQuestionsResponsesExist = questionsResponses.find(
      (page) => page.pageNum === selectedPageNum
    );
    const initialResponses = pageQuestionsResponsesExist
      ? pageQuestionsResponsesExist.questionsResponses
      : questions!.map((question) => {
          return {
            questionId: question.id,
            required: question.required,
            answer:
              question.type === QuestionType.checkboxes ? ([] as string[]) : "",
            questionType: question.type,
          };
        });

    return initialResponses;
  }, [questions, questionsResponses, selectedPageNum]);

  const handleSurveyDataChanged = () => {
    restartPreview();
  };

  const handleSuccessfullPageSubmission = (
    data: QuestionsResponsesData,
    submitted: boolean = false
  ) => {
    if (submitted) {
      setIsPreviewFinished(true);
      saveQuestionsResponsesData(data.questionResponses);
    } else {
      saveQuestionsResponsesData(data.questionResponses);
      setSelectedPageNum((selectedPageNum) => selectedPageNum + 1);
    }
  };

  const handlePreviousPage = () => {
    setSelectedPageNum((selectedPageNum) => selectedPageNum - 1);
  };

  //after selected page successfully loads clear previous pages cashed data.
  useEffect(() => {
    if (questions && page) {
      clearPagesCachedData(true);
    }
  }, [questions, surveyId, queryClient, page, clearPagesCachedData]);

  return {
    isLoading: loadingPages || loadingQuestions,
    handleSuccessfullPageSubmission,
    handleSurveyDataChanged,
    handlePreviousPage,
    getInitialQuestionResponses,
    saveQuestionsResponsesData,
    restartPreview,
    isPreviewFinished,
    questions,
    surveyPages,
    surveyResposneStartTime,
    selectedPageNum,
    fetchingPageQuestions: isFetching,
    pageId: page,
    isError,
  };
}
