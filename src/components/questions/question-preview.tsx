import { QuestionsListContext } from "@/lib/context";
import { Question } from "@/lib/types";
import React, { useContext } from "react";

type QuestionPreviewProps = {
  question: Question;
};

const QuestionPreview = ({ question }: QuestionPreviewProps) => {
  const { setPendingQuestion, setAddingQuestion } =
    useContext(QuestionsListContext);

  return (
    <div
      data-question="true"
      onClick={() => {
        setPendingQuestion(question.id!);
        setAddingQuestion(false);
      }}
      className="p-2 cursor-pointer relative bg-white rounded-sm hover:bg-slate-200 after:absolute after:top-0 after:left-0 after:bg-transparent after:w-full after:h-full"
      key={question.id}
    >
      <div className="text-lg">
        <span className="font-bold">{1}.</span>
        <h4
          dangerouslySetInnerHTML={{
            __html: question.description,
          }}
        ></h4>
      </div>
      <div className="font-bold mt-2">type:{question.type}</div>
    </div>
  );
};

export default QuestionPreview;
