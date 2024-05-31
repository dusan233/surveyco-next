"use client";

import React, { useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import QuestionResponse from "@/components/questions/response/question-response";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import WindowedVirtualList from "@/components/layout/windowed-virtual-list";
import { Question, QuestionsResponsesData } from "@/types/question";

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
    count: questions.length,
    estimateSize: () => 50,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  return (
    <WindowedVirtualList
      virtualizer={virtualizer}
      ref={listRef}
      renderItem={(virtualRow) => {
        const questionData = questions[virtualRow.index];
        const questionResponseField = fields[virtualRow.index];
        return (
          <QuestionResponse
            question={questionData}
            index={virtualRow.index}
            defaultValue={questionResponseField.answer}
          />
        );
      }}
    />
  );
};

export default QuestionResponseList;
