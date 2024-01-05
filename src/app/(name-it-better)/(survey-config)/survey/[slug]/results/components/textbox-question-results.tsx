import { TextboxQuestionResult } from "@/lib/types";
import { convert } from "html-to-text";
import React from "react";

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
      <div className="flex gap-3 mt-5 text-slate-400">
        <span>Answered: {questionResult.answeredCount}</span>
        <span>Skipped: {questionResult.skippedCount}</span>
      </div>
      <div className="mt-10 flex flex-col gap-2">
        {questionResult.answers.map((answer) => {
          return (
            <div className="bg-slate-300 rounded-sm p-2" key={answer.id}>
              {answer.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextboxQuestionResults;
