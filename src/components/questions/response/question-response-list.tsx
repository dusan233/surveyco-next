"use client";

import { Question, QuestionsResponsesData } from "@/lib/types";
import React from "react";
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

  return (
    <WindowVirtualList
      items={questions}
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
