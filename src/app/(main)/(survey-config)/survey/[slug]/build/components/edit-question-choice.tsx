import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RichTextEditor } from "@/components/text-editor/rich-text";
import { Control, SubmitHandler, useFormContext } from "react-hook-form";

import { FaPlus, FaMinus } from "react-icons/fa6";
import EditQuestionChoiceDescription from "./edit-question-choice-description";

type EditQuestionChoiceProps = {
  surveyId: string;
  index: number;
  removeOption: (optionIndex: number) => void;
  removeDisabled: boolean;
  addAnotherOption: (currentIndex: number) => void;
  handleSaveQuestion: SubmitHandler<any>;
};

const EditQuestionChoice = ({
  index,
  addAnotherOption,
  removeOption,
  removeDisabled,
  surveyId,
  handleSaveQuestion,
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
          onClick={() => addAnotherOption(index)}
          title="Add another option"
          className="rounded-full inline-flex justify-center hover:border-neutral-400 items-center w-8 h-8 border"
        >
          <FaPlus />
        </button>
        {!removeDisabled && (
          <button
            type="button"
            onClick={() => removeOption(index)}
            title="Delete this option"
            className="rounded-full inline-flex justify-center hover:border-neutral-400 items-center w-8 h-8 border"
          >
            <FaMinus />
          </button>
        )}
      </div>
    </div>
  );
};

export default EditQuestionChoice;
