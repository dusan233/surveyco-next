import { Question, QuestionType, UnsavedQuestion } from "@/lib/types";
import { getQuestionTypeLable } from "@/lib/utils";
import React, { useContext } from "react";

import QuestionActions from "./question-actions";
import { QuestionsListContext } from "@/lib/context";
import { Button } from "../ui/button";
import { Lightbulb, Settings } from "lucide-react";

type QuestionHeaderProps = {
  question: Question | UnsavedQuestion;
  index: number;
  surveyId: string;
};

const QuestionHeader = ({ question, index, surveyId }: QuestionHeaderProps) => {
  const { currentPage } = useContext(QuestionsListContext);
  return (
    <div className="flex gap-2 justify-between text-lg mb-5">
      <div className="flex-1 flex gap-2 items-end">
        <div className="font-bold">Q{question.number}</div>
        <div className="text-base">{getQuestionTypeLable(question.type)}</div>
      </div>
      {question.id && (
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="icon">
            <Lightbulb className="h-6 w-6" />
          </Button>
          <QuestionActions
            surveyId={surveyId}
            questionId={question.id!}
            currentPage={currentPage!}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionHeader;
