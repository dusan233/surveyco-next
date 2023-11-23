import { QuestionType } from "@/lib/types";
import { getQuestionTypeLable } from "@/lib/utils";
import React from "react";

type QuestionHeaderProps = {
  type: QuestionType;
  index: number;
};

const QuestionHeader = ({ type, index }: QuestionHeaderProps) => {
  return (
    <div className="flex gap-2 items-end  text-lg mb-5">
      <div className="font-bold">Q{index + 1}</div>
      <div className="text-base">{getQuestionTypeLable(type)}</div>
    </div>
  );
};

export default QuestionHeader;
