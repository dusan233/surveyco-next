"use client";

import SurveyResponseForm from "@/components/survey/survey-response-form";
import Spinner from "@/components/ui/spinner";
import useSurveyPages from "@/lib/hooks/useSurveyPages";
import useSurveyQuestions from "@/lib/hooks/useSurveyQuestions";
import { Question, QuestionType } from "@/lib/types";

import React, { useEffect, useState } from "react";
import PreviewEnd from "./components/preview-end";
import { QueryCache, useQueryClient } from "@tanstack/react-query";

const SurveyPreviewPage = ({ params }: { params: { slug: string } }) => {
  const queryClient = useQueryClient();
  const surveyId = params.slug;
  const [isPreviewFinished, setIsPreviewFinished] = useState(false);
  const [selectedPageNum, setSelectedPageNum] = useState(1);
  const [displayPageNum, setDisplayPageNum] = useState(-1);
  const [questions, setQuestions] = useState<Question[] | undefined>([]);
  const { surveyPages, isLoading: loadingPages } = useSurveyPages(surveyId);
  const {
    questions: questionsData,
    isLoading: loadingQuestions,
    isFetching,
  } = useSurveyQuestions(surveyId, selectedPageNum);
  const [questionsResponses, setQuestionsResponses] = useState<
    {
      pageNum: number;
      questionsResponses: { id: string; answer: string | string[] }[];
    }[]
  >([]);

  const saveQuestionsResponsesData = (
    questionsResponsesData: { id: string; answer: string | string[] }[]
  ) => {
    setQuestionsResponses((currentQuestionsResponses) => {
      const pageQuestionsResponsesExist = currentQuestionsResponses.find(
        (page) => page.pageNum === displayPageNum
      );

      if (pageQuestionsResponsesExist) {
        return currentQuestionsResponses.map((page) => {
          if (page.pageNum === displayPageNum)
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

  const restartPreview = async () => {
    queryClient.clear();
    setIsPreviewFinished(false);
    setSelectedPageNum(1);
    setQuestionsResponses([]);
    setQuestions([]);
  };

  useEffect(() => {
    if (!isFetching) {
      setQuestions(questionsData);
      setDisplayPageNum(selectedPageNum);
    }
  }, [isFetching, selectedPageNum, questionsData]);

  if (loadingPages || loadingQuestions)
    return (
      <div className="flex justify-center pt-10">
        <Spinner size="xl" />
      </div>
    );

  if (isPreviewFinished)
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <PreviewEnd restartPreview={restartPreview} surveyId={surveyId} />
      </div>
    );

  return (
    <div className="bg-slate-100 p-10">
      <div className="max-w-3xl mx-auto">
        {surveyPages!.map((page) => {
          const pageQuestionsResponsesExist = questionsResponses.find(
            (page) => page.pageNum === displayPageNum
          );
          const initFormValues = pageQuestionsResponsesExist
            ? pageQuestionsResponsesExist.questionsResponses
            : questions!.map((question) => {
                return {
                  id: question.id,
                  answer:
                    question.type === QuestionType.checkboxes
                      ? ([] as string[])
                      : "",
                };
              });

          return page.number === displayPageNum ? (
            <SurveyResponseForm
              key={page.id}
              displayPageNum={displayPageNum}
              setSelectedPageNum={setSelectedPageNum}
              surveyPages={surveyPages!}
              questions={questions!}
              isFetchingPage={isFetching}
              initValue={initFormValues}
              saveQuestionsResponsesData={saveQuestionsResponsesData}
              setIsPreviewFinished={setIsPreviewFinished}
              questionsResponses={questionsResponses}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default SurveyPreviewPage;
