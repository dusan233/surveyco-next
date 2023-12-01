import { QuestionsListContext } from "@/lib/context";
import { Question } from "@/lib/types";
import React, { useContext } from "react";
import QuestionActions from "./question-actions";
import { Draggable } from "react-beautiful-dnd";

type QuestionPreviewProps = {
  question: Question;
  surveyId: string;
  index: number;
};

const QuestionPreview = ({
  question,
  surveyId,
  index,
}: QuestionPreviewProps) => {
  const { setPendingQuestion, setAddingQuestion } =
    useContext(QuestionsListContext);

  return (
    <Draggable draggableId={question.id} index={index}>
      {(provided, { isDragging }) => (
        <div
          data-question="true"
          onClick={() => {
            setPendingQuestion(question.id!);
            setAddingQuestion(false);
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 mb-4 ${
            isDragging &&
            "outline-dashed outline-3 outline-blue-500 outline-offset-4"
          } shadow-sm !cursor-pointer relative bg-white rounded-sm hover:bg-slate-200 after:absolute after:top-0 after:left-0 after:bg-transparent after:w-full after:h-full`}
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
      )}
    </Draggable>
  );
};

export default QuestionPreview;
