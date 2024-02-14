import { Question, UnsavedQuestion } from "@/lib/types";
import { getQuestionTypeLable } from "@/lib/utils";
import React from "react";

import QuestionActions from "./question-actions";

type EditQuestionHeaderProps = {
  question: Question | UnsavedQuestion;
  surveyId: string;
};

const EditQuestionHeader = ({
  question,
  surveyId,
}: EditQuestionHeaderProps) => {
  return (
    <div className="flex gap-2 justify-between text-lg mb-5">
      <div className="flex-1 flex gap-2 items-end">
        <div className="font-bold">Q{question.number}</div>
        <div className="text-base">{getQuestionTypeLable(question.type)}</div>
      </div>
      {question.id && (
        <div className="flex gap-2">
          <QuestionActions surveyId={surveyId} questionId={question.id} />
        </div>
      )}
    </div>
  );
};

export default EditQuestionHeader;
