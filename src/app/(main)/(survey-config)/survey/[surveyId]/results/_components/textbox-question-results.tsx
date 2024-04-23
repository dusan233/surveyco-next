import { TextboxQuestionResult } from "@/lib/types";
import React from "react";
import { format } from "date-fns";
import QuestionResultDescription from "./question-result-description";

type TextboxQuestionResultsProps = {
  questionResult: TextboxQuestionResult;
};

const TextboxQuestionResults = ({
  questionResult,
}: TextboxQuestionResultsProps) => {
  return (
    <div className="p-5 shadow-sm rounded-lg bg-white">
      <QuestionResultDescription questionResult={questionResult} />

      {questionResult.answeredCount !== 0 ? (
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
      ) : (
        <div className="mt-10 text-center">
          <p>No matching responses.</p>
        </div>
      )}
    </div>
  );
};

export default TextboxQuestionResults;