"use client";

import { Question, QuestionsResponsesData } from "@/lib/types";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import React, { useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import QuestionResponse from "@/components/questions/response/question-response";
import WindowVirtualList from "@/components/layout/window-virtual-list";

type QuestionResponseListProps = {
  questions: Question[];
};

const QuestionResponseList = ({ questions }: QuestionResponseListProps) => {
  const { control } = useFormContext<QuestionsResponsesData>();
  const { fields } = useFieldArray({
    control: control,
    name: "questionResponses",
    keyName: "qId",
  });

  const listRef = useRef<HTMLDivElement | null>(null);
  const virtualizer = useWindowVirtualizer({
    count: fields.length,
    estimateSize: () => 50,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });
  const virtualItems = virtualizer.getVirtualItems();

  return (
    <WindowVirtualList listRef={listRef} virtualizer={virtualizer}>
      {virtualItems.map((virtualRow) => {
        const questionData = questions[virtualRow.index];
        const questionResponseField = fields[virtualRow.index];
        return (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
            className="pb-7"
          >
            <QuestionResponse
              question={questionData}
              index={virtualRow.index}
              defaultValue={questionResponseField.answer}
            />
          </div>
        );
      })}
    </WindowVirtualList>
  );
};

export default QuestionResponseList;
