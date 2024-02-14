"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import useBuildQuestionsContext from "../hooks/useBuildQuestionsContext";
import { Question, UnsavedQuestion } from "@/lib/types";

const QuestionFooter = ({
  isDisabled,
  question,
}: {
  isDisabled: boolean;
  question: Question | UnsavedQuestion;
}) => {
  const setQueueQuestion = useBuildQuestionsContext((s) => s.setQueueQuestion);
  const setAddingQuestion = useBuildQuestionsContext(
    (s) => s.setAddingQuestion
  );
  const addingQuestion = useBuildQuestionsContext((s) => s.addingQuestion);

  return (
    <div className="flex justify-end gap-2 mt-5">
      <Button
        onClick={() => {
          if (addingQuestion && !question.id) {
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
      <Button
        disabled={isDisabled}
        loading={isDisabled}
        size="sm"
        type="submit"
      >
        Save
      </Button>
    </div>
  );
};

export default QuestionFooter;
