"use client";

import { MultipleChoiceQuestionResult } from "@/lib/types";
import React, { useState } from "react";
import { convert } from "html-to-text";

import BarChartResults from "./bar-chart-results";
import MultiChoiceResultsTable from "./multi-choice-results-table";
import PieChartResults from "./pie-chart-results";

import QuestionResultDescription from "./question-result-description";
import { CheckedState } from "@radix-ui/react-checkbox";

import DisplayResultsOptions from "./display-results-options";

type MultiChoiceQuestionResultsProps = {
  questionResult: MultipleChoiceQuestionResult;
};

const MultiChoiceQuestionResults = ({
  questionResult,
}: MultiChoiceQuestionResultsProps) => {
  const [showChartResults, setShowChartResults] = useState<CheckedState>(true);
  const [showTableResults, setShowTableResults] = useState<CheckedState>(false);
  const [chartType, setChartType] = useState("bar");

  const resultsFormatedData = questionResult.choices.map((choice) => {
    const percenteges =
      questionResult.answeredCount === 0
        ? 0
        : parseFloat(
            (
              (choice.answeredCount / questionResult.answeredCount) *
              100
            ).toFixed(2)
          );
    return {
      ...choice,
      percenteges,
    };
  });

  return (
    <div className="p-5 shadow-sm rounded-lg bg-white">
      <QuestionResultDescription questionResult={questionResult} />
      {questionResult.answeredCount !== 0 ? (
        <>
          <DisplayResultsOptions
            questionResult={questionResult}
            showChartResults={showChartResults}
            showTableResults={showTableResults}
            chartType={chartType}
            setChartType={setChartType}
            setShowChartResults={setShowChartResults}
            setShowTableResults={setShowTableResults}
          />

          {(showChartResults || showTableResults) && (
            <div className="mt-10">
              {showChartResults && (
                <div className="max-w-2xl overflow-auto w-full">
                  {chartType === "pie" ? (
                    <PieChartResults data={resultsFormatedData} />
                  ) : (
                    <BarChartResults data={resultsFormatedData} />
                  )}
                </div>
              )}

              {showTableResults && (
                <div className="flex-1 mt-5">
                  <MultiChoiceResultsTable data={resultsFormatedData} />
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="mt-10 text-center">
          <p>No matching responses.</p>
        </div>
      )}
    </div>
  );
};

export default MultiChoiceQuestionResults;
