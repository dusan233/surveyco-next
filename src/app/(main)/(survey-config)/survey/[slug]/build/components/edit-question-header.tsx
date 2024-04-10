import { Question, UnsavedQuestion } from "@/lib/types";
import React from "react";

import QuestionActions from "./question-actions";
import { Edit } from "lucide-react";
import { getQuestionTypeLable } from "@/lib/util/questionUtil";

type EditQuestionHeaderProps = {
  question: Question | UnsavedQuestion;
  surveyId: string;
};

const EditQuestionHeader = ({
  question,
  surveyId,
}: EditQuestionHeaderProps) => {
  return (
    <>
      {question.id && (question as Question).hasResponses && (
        <div className="px-2 py-1.5 rounded-md mb-5 flex gap-5 items-center bg-primary">
          <Edit className="w-6 h-6 text-amber-300" />
          <p className="text-white text-xs">
            Responses collected: Changes to this question will be limited.
          </p>
        </div>
      )}
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
    </>
  );
};

export default EditQuestionHeader;
