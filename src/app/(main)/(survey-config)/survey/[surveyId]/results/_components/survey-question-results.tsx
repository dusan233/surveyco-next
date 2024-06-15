"use client";

import { useQuestionResults } from "../useSurveyResults";

import React, { useRef, useState } from "react";
import MultiChoiceQuestionResults from "./multi-choice-results";
import TextboxQuestionResults from "./textbox-question-results";

import useSurveyPages from "@/hooks/useSurveyPages";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import SurveyQuestionResultsControl from "./survey-question-results-control";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import WindowedVirtualList from "@/components/layout/windowed-virtual-list";
import { Survey } from "@/types/survey";
import { QuestionType } from "@/types/question";
import useToastError from "@/hooks/useToastError";
import { getErrorMessage } from "@/lib/util/errorUtils";

type SurveyResultsProps = {
  survey: Survey;
  surveyId: string;
};

const SurveyQuestionResults = ({ surveyId, survey }: SurveyResultsProps) => {
  const { surveyPages } = useSurveyPages(surveyId);

  const [selectedPage, setSelectedPage] = useState(() => {
    const firstPage = surveyPages!.find((page) => page.number === 1);

    return firstPage!.id;
  });
  const { questionResults, isFetching, lastSuccessData, isError, error } =
    useQuestionResults(surveyId, selectedPage);
  useToastError(isError, getErrorMessage(error));

  const questionResultsData = questionResults || lastSuccessData.current;
  const listRef = useRef<HTMLDivElement | null>(null);
  const virtualizer = useWindowVirtualizer({
    count: questionResultsData!.length,
    estimateSize: () => 50,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  useLoadingToast(isFetching, "Loading results...");

  return (
    <div className="flex flex-col gap-5">
      <SurveyQuestionResultsControl
        setPage={setSelectedPage}
        page={selectedPage}
        surveyPages={surveyPages!}
        surveyResponseCount={survey.responses_count}
      />

      <WindowedVirtualList
        virtualizer={virtualizer}
        ref={listRef}
        renderItem={(virtualRow) => {
          const qResult = questionResultsData![virtualRow.index];

          return qResult.type !== QuestionType.textbox ? (
            <MultiChoiceQuestionResults questionResult={qResult} />
          ) : (
            <TextboxQuestionResults questionResult={qResult} />
          );
        }}
      />
    </div>
  );
};

export default SurveyQuestionResults;
