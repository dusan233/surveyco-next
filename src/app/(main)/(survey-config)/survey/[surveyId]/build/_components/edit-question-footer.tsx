"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";
import { Question, UnsavedQuestion } from "@/types/question";
import { isSavedQuestion } from "@/lib/util/questionUtils";
import Spinner from "@/components/ui/spinner";

type QuestionFooterProps = {
  isDisabled: boolean;
  question: Question | UnsavedQuestion;
};

const QuestionFooter = ({ isDisabled, question }: QuestionFooterProps) => {
  const setQueueQuestion = useBuildQuestionsContext((s) => s.setQueueQuestion);
  const setAddingQuestion = useBuildQuestionsContext(
    (s) => s.setAddingQuestion
  );
  const addingQuestion = useBuildQuestionsContext((s) => s.addingQuestion);

  return (
    <div className="flex justify-end gap-2 mt-5">
      <Button
        onClick={() => {
          if (addingQuestion && !isSavedQuestion(question)) {
            setAddingQuestion(false);
          } else {
            setQueueQuestion(null);
          }
        }}
        variant="outline"
        disabled={isDisabled}
        type="button"
        size="sm"
      >
        Cancel
      </Button>
      <Button disabled={isDisabled} size="sm" type="submit">
        Save {isDisabled && <Spinner size="xs" />}
      </Button>
    </div>
  );
};

export default QuestionFooter;
