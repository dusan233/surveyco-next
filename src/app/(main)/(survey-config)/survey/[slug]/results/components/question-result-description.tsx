import { QuestionResult } from "@/lib/types";
import { getQuestionTypeLable } from "@/lib/utils";
import { convert } from "html-to-text";
import React from "react";

type QuestionResultDescriptionProps = {
  questionResult: QuestionResult;
};

const QuestionResultDescription = ({
  questionResult,
}: QuestionResultDescriptionProps) => {
  return (
    <>
      <div className="flex items-start gap-3">
        <span className="font-bold text-xl">Q{questionResult.number}</span>
        <h4 className="flex-1 text-xl">
          {convert(questionResult.description)}
        </h4>
      </div>
      <div className="flex gap-6 mt-5 text-gray-500">
        <span className="text-black">
          Type: {getQuestionTypeLable(questionResult.type)}
        </span>
        <div className="flex gap-3">
          <span>Answered: {questionResult.answeredCount}</span>
          <span>Skipped: {questionResult.skippedCount}</span>
        </div>
      </div>
    </>
  );
};

export default QuestionResultDescription;
