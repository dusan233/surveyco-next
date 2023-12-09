import React from "react";
import { Control, useFieldArray } from "react-hook-form";
import QuestionOption from "./question-option";
import {} from "./build-multichoice-question";
import { z } from "zod";
import { multiChoiceQuestionSchema } from "@/lib/validationSchemas";

type QuestionOptionListProps = {
  control: Control<z.infer<typeof multiChoiceQuestionSchema>, any>;
};

const QuestionOptionList = ({ control }: QuestionOptionListProps) => {
  const {
    fields: options,
    insert,
    remove,
  } = useFieldArray({
    control: control,
    name: "options",
    keyName: "optionId",
  });

  const addAnotherOption = (currentIndex: number) => {
    const newOptionIndex = currentIndex + 1;
    insert(newOptionIndex, {
      description: "",
    });
  };

  const removeOption = (optionIndex: number) => {
    remove(optionIndex);
  };

  return (
    <div className="flex flex-col gap-2 ml-3">
      {options.map((option, index) => {
        return (
          <QuestionOption
            addAnotherOption={addAnotherOption}
            removeOption={removeOption}
            removeDisabled={options.length === 1}
            key={option.optionId}
            control={control}
            option={option}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default QuestionOptionList;
