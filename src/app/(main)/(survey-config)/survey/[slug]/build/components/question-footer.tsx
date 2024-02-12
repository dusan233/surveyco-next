"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import useBuildQuestionsContext from "../useBuildQuestionsContext";

const QuestionFooter = ({
  questionIndex,
  isDisabled,
}: {
  questionIndex: number;
  isDisabled: boolean;
}) => {
  const questions = useBuildQuestionsContext((s) => s.questions);
  const lastQuestionIndex = questions.length - 1;
  const setQueueQuestion = useBuildQuestionsContext((s) => s.setQueueQuestion);
  const setAddingQuestion = useBuildQuestionsContext(
    (s) => s.setAddingQuestion
  );
  const addingQuestion = useBuildQuestionsContext((s) => s.addingQuestion);

  return (
    <div className="flex justify-end gap-2 mt-5">
      <Button
        onClick={() => {
          if (addingQuestion && lastQuestionIndex === questionIndex) {
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
        Save
      </Button>
    </div>
  );
};

export default QuestionFooter;
