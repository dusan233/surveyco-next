import { Question } from "@/types/question";
import DOMPurify from "isomorphic-dompurify";
import React from "react";

type QuestionDescriptionProps = {
  question: Question;
};

const QuestionDescription = ({ question }: QuestionDescriptionProps) => {
  return (
    <div className="block sm:flex items-start gap-3">
      <span className="font-bold text-xl">
        {question.required && "*"}
        {question.number}.
      </span>
      <h4
        className="w-full min-w-[1%] text-xl break-words"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(question.description),
        }}
      ></h4>
    </div>
  );
};

export default QuestionDescription;
