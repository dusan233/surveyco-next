import { QuestionsListContext } from "@/lib/context";
import React, { useContext } from "react";
import { Button } from "../ui/button";

const QuestionFooter = () => {
  const { setSelectedQuestion } = useContext(QuestionsListContext);
  return (
    <div className="flex justify-end gap-2 mt-5">
      <Button
        onClick={() => {
          setSelectedQuestion(null);
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
