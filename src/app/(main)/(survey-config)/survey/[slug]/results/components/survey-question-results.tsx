"use client";

import { useQuestionResults } from "@/lib/hooks/useSurveyResults";
import {
  MultipleChoiceQuestionResult,
  QuestionType,
  QuizResponseData,
  TextboxQuestionResult,
} from "@/lib/types";
import React, { useState } from "react";
import MultiChoiceQuestionResults from "./multi-choice-results";
import TextboxQuestionResults from "./textbox-question-results";

import useSurveyPages from "@/lib/hooks/useSurveyPages";
import { useLoadingToast } from "@/lib/hooks/useLoadingToast";
import WindowVirtualList from "@/components/layout/window-virtual-list";
import SurveyQuestionResultsControl from "./survey-question-results-control";

type SurveyResultsProps = {
  survey: QuizResponseData;
  surveyId: string;
};

const SurveyQuestionResults = ({ surveyId, survey }: SurveyResultsProps) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const { questionResults, isFetching } = useQuestionResults(
    surveyId,
    selectedPage
  );
  const { surveyPages } = useSurveyPages(surveyId);

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
        items={questionResults!}
        renderItem={(virtualRow) => {
          const qResult = questionResults![virtualRow.index];
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
