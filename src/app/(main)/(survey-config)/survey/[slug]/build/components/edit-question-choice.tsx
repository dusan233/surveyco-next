import React from "react";

import { SubmitHandler } from "react-hook-form";

import { FaPlus, FaMinus } from "react-icons/fa6";
import EditQuestionChoiceDescription from "./edit-question-choice-description";

type EditQuestionChoiceProps = {
  surveyId: string;
  index: number;
  removeOption: (optionIndex: number) => void;
  removeDisabled: boolean;
  addAnotherOption: (currentIndex: number) => void;
  handleSaveQuestion: SubmitHandler<any>;
  addOptionDisabled: boolean;
  canRemoveOption: boolean;
};

const EditQuestionChoice = ({
  index,
  addAnotherOption,
  removeOption,
  removeDisabled,
  surveyId,
  handleSaveQuestion,
  addOptionDisabled,
  canRemoveOption,
}: EditQuestionChoiceProps) => {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <EditQuestionChoiceDescription
          index={index}
          surveyId={surveyId}
          handleSaveQuestion={handleSaveQuestion}
        />
      </div>
      <div className="flex justify-start gap-2">
        <button
          type="button"
          disabled={addOptionDisabled}
          onClick={() => addAnotherOption(index)}
          title="Add another option"
          className="rounded-full text-neutral-500 inline-flex justify-center disabled:pointer-events-none disabled:opacity-50 hover:border-neutral-400 items-center w-7 h-7 border-2 border-gray-300"
        >
          <FaPlus />
        </button>
        {!removeDisabled && (
          <button
            type="button"
            disabled={!canRemoveOption}
            onClick={() => removeOption(index)}
            title="Delete this option"
            className="rounded-full text-neutral-500 inline-flex justify-center disabled:pointer-events-none disabled:opacity-50 hover:border-neutral-400 items-center w-7 h-7 border-2 border-gray-300"
          >
            <FaMinus />
          </button>
        )}
      </div>
    </div>
  );
};

export default EditQuestionChoice;
