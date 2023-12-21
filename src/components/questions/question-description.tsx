import { Question } from "@/lib/types";
import DOMPurify from "isomorphic-dompurify";
import React from "react";

type QuestionDescriptionProps = {
  question: Question;
};

const QuestionDescription = ({ question }: QuestionDescriptionProps) => {
  return (
    <div className="flex items-start gap-3">
      <span className="font-bold text-xl">{question.number}.</span>
      <h4
        className="flex-1 text-xl"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(question.description),
        }}
      ></h4>
    </div>
  );
};

export default QuestionDescription;
