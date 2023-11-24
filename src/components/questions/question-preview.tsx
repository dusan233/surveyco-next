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
      <div className="flex items-start gap-3">
        <span className="font-bold text-xl">{question.number}.</span>
        <h4
          className="flex-1 text-lg "
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
