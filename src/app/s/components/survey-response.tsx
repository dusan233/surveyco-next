"use client";

import useSurveyPages from "@/lib/hooks/useSurveyPages";
import useSurveyQuestions from "@/lib/hooks/useSurveyQuestions";
import React, { useEffect, useRef, useState } from "react";
import SurveyResponseForm from "./survey-response-form";
import { Question } from "@/lib/types";

type SurveyResponseProps = {
  surveyId: string;
  collectorId: string;
};

const SurveyResponse = ({ surveyId, collectorId }: SurveyResponseProps) => {
  const [selectedPageNum, setSelectedPageNum] = useState(1);
  const [displayPageNum, setDisplayPageNum] = useState(1);

  const { surveyPages, isLoading: loadingPages } = useSurveyPages(surveyId);
  const {
    questions: questionsData,
    isLoading: loadingQuestions,
    isFetching,
  } = useSurveyQuestions(surveyId, selectedPageNum);
  const [questions, setQuestions] = useState<Question[] | undefined>(
    questionsData
  );

  useEffect(() => {
    if (!isFetching) {
      console.log(questionsData);
      setQuestions(questionsData);
      setDisplayPageNum(selectedPageNum);
    }
  }, [isFetching, selectedPageNum, questionsData]);

  return (
    <div>
      {/* {surveyPages!.map((page) => {
        return page.number === displayPageNum ? (
          <SurveyResponseForm
            key={page.id}
            displayPageNum={displayPageNum}
            setSelectedPageNum={setSelectedPageNum}
            surveyPages={surveyPages!}
            questions={questions!}
            isFetchingPage={isFetching}
          />
        ) : null;
      })} */}
      <SurveyResponseForm
        surveyId={surveyId}
        collectorId={collectorId}
        key={
          !isFetching
            ? surveyPages?.find((page) => page.number === displayPageNum)?.id
            : ""
        }
        isFetchingPage={isFetching}
        questions={questionsData!}
        surveyPages={surveyPages!}
        setSelectedPageNum={setSelectedPageNum}
        displayPageNum={displayPageNum}
      />
    </div>
  );
};

export default SurveyResponse;
