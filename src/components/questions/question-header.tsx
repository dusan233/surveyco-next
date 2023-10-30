import { QuestionType } from "@/lib/types";
import React from "react";

type QuestionHeaderProps = {
  type: QuestionType;
  index: number;
};

const QuestionHeader = ({ type, index }: QuestionHeaderProps) => {
  return (
    <div className="flex gap-2 font-bold mb-5">
      <div>Q{index + 1}</div>
      <div>type: {type}</div>
    </div>
  );
};

export default QuestionHeader;
