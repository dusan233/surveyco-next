"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useQuestionResults } from "@/lib/hooks/useSurveyResults";
import {
  MultipleChoiceQuestionResult,
  Question,
  QuestionType,
} from "@/lib/types";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import React, { useEffect } from "react";
import MultiChoiceQuestionResults from "./multi-choice-results";

type SurveyResultsProps = {
  questions: Question[];
  surveyId: string;
};

const SurveyResults = ({ surveyId, questions }: SurveyResultsProps) => {
  const { questionResults, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useQuestionResults(surveyId, questions);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const virtualizer = useWindowVirtualizer({
    count: questionResults!.length,
    estimateSize: () => 50,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });
  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className="flex flex-col gap-5 ">
      {isFetchingNextPage && <div className="fixed top-10 left-0">sadd</div>}
      <div ref={listRef}>
        <div
          className="w-full relative"
          style={{
            height: `${
              virtualItems.length === 0 ? 0 : virtualizer.getTotalSize()
            }px`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${
                virtualItems[0]?.start - virtualizer.options.scrollMargin
              }px)`,
            }}
          >
            {virtualItems.map((virtualRow) => {
              const qResult = questionResults![virtualRow.index];

              return (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  className="pb-3"
                >
                  {qResult.type !== QuestionType.textbox ? (
                    <MultiChoiceQuestionResults
                      questionResult={qResult as MultipleChoiceQuestionResult}
                    />
                  ) : (
                    <div className="bg-teal-300 h-80" key={qResult.id}>
                      <p>{qResult.id}</p>
                      <p>{qResult.number}</p>
                      <p>{qResult.type}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Spinner size="lg" />
          ) : (
            <Button onClick={() => fetchNextPage()}>More</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SurveyResults;
