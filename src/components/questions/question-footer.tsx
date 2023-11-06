import { QuestionsListContext } from "@/lib/context";
import React, { useContext } from "react";
import { Button } from "../ui/button";

const QuestionFooter = ({ questionIndex }: { questionIndex: number }) => {
  const {
    setSelectedQuestion,
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
            setSelectedQuestion(null);
          }
        }}
        variant="outline"
        type="button"
        size="sm"
      >
        Cancel
      </Button>
      <Button size="sm" type="submit">
        Save
      </Button>
    </div>
  );
};

export default QuestionFooter;
