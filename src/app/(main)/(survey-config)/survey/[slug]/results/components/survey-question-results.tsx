"use client";

import { useQuestionResults } from "../useSurveyResults";
import {
  MultipleChoiceQuestionResult,
  QuestionType,
  QuizResponseData,
  TextboxQuestionResult,
} from "@/lib/types";
import React, { useState } from "react";
import MultiChoiceQuestionResults from "./multi-choice-results";
import TextboxQuestionResults from "./textbox-question-results";

import useSurveyPages from "@/hooks/useSurveyPages";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import WindowVirtualList from "@/components/layout/window-virtual-list";
import SurveyQuestionResultsControl from "./survey-question-results-control";

type SurveyResultsProps = {
  survey: QuizResponseData;
  surveyId: string;
};

const SurveyQuestionResults = ({ surveyId, survey }: SurveyResultsProps) => {
  const { surveyPages } = useSurveyPages(surveyId);
  const [selectedPage, setSelectedPage] = useState(() => {
    const firstPage = surveyPages!.find((page) => page.number === 1);

    return firstPage!.id;
  });
  const { questionResults, isFetching, lastSuccessData } = useQuestionResults(
    surveyId,
    selectedPage
  );

  const questionResultsData = questionResults || lastSuccessData.current;

  useLoadingToast(isFetching, "Loading results...");

  return (
    <div className="flex flex-col gap-5">
      <SurveyQuestionResultsControl
        setPage={setSelectedPage}
        page={selectedPage}
        surveyPages={surveyPages!}
        surveyResponseCount={survey.responses_count}
      />

      <WindowVirtualList
        items={questionResultsData!}
        renderItem={(virtualRow) => {
          const qResult = questionResultsData![virtualRow.index];
          return qResult.type !== QuestionType.textbox ? (
            <MultiChoiceQuestionResults
              questionResult={qResult as MultipleChoiceQuestionResult}
            />
          ) : (
            <TextboxQuestionResults
              questionResult={qResult as TextboxQuestionResult}
            />
          );
        }}
      />
    </div>
  );
};

export default SurveyQuestionResults;
