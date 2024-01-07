import { TextboxQuestionResult } from "@/lib/types";
import { getQuestionTypeLable } from "@/lib/utils";
import { convert } from "html-to-text";
import React from "react";
import { format } from "date-fns";

type TextboxQuestionResultsProps = {
  questionResult: TextboxQuestionResult;
};

const TextboxQuestionResults = ({
  questionResult,
}: TextboxQuestionResultsProps) => {
  return (
    <div className="p-5 shadow-sm rounded-lg bg-white">
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
      <div className="mt-10 flex flex-col gap-2">
        {questionResult.answers.map((answer) => {
          return (
            <div
              className="bg-slate-50 text-gray-500 border rounded-sm py-1 px-1.5"
              key={answer.id}
            >
              <div className="font-medium text-black"> {answer.text}</div>
              <div className="text-sm mt-2">
                {format(new Date(answer.updated_at), "MM/dd/yyyy hh:mm a")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextboxQuestionResults;
