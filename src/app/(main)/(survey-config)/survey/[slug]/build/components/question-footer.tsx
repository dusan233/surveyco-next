import { QuestionsListContext } from "@/lib/context";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";

const QuestionFooter = ({
  questionIndex,
  isDisabled,
}: {
  questionIndex: number;
  isDisabled: boolean;
}) => {
  const {
    setPendingQuestion,
    lastQuestionIndex,
    addingQuestion,
    setAddingQuestion,
  } = useContext(QuestionsListContext);
  return (
    <div className="flex justify-end gap-2 mt-5">
      <Button
        onClick={() => {
          if (addingQuestion && lastQuestionIndex === questionIndex) {
            setAddingQuestion(false);
          } else {
            setPendingQuestion(null);
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
