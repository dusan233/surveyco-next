import React from "react";
import { Control, SubmitHandler, useFieldArray } from "react-hook-form";
import EditQuestionChoice from "./edit-question-choice";
import { z } from "zod";
import { multiChoiceQuestionSchema } from "@/lib/validationSchemas";

type EditQuestionChoiceListProps = {
  control: Control<z.infer<typeof multiChoiceQuestionSchema>, any>;
  surveyId: string;
  handleSaveQuestion: SubmitHandler<any>;
  canRemoveOptions: boolean;
};

const EditQuestionChoiceList = ({
  control,
  surveyId,
  handleSaveQuestion,
  canRemoveOptions,
}: EditQuestionChoiceListProps) => {
  const { fields: options, replace } = useFieldArray({
    control: control,
    name: "options",
    keyName: "optionId",
  });

  const addAnotherOption = (currentIndex: number) => {
    const newOptionIndex = currentIndex + 1;
    const newOptionNumber = newOptionIndex + 1;
    const newOption = {
      description: "",
      descriptionImage: null,
      number: newOptionNumber,
    };
    const updatedOldOptions = options.map((option) => {
      let optionNumber = option.number;
      if (option.number >= newOptionNumber) {
        optionNumber = optionNumber + 1;
      }
      return {
        number: optionNumber,
        description: option.description,
        descriptionImage: option.descriptionImage,
        ...(option.id && { id: option.id }),
      };
    });
    const newOptions = [...updatedOldOptions, newOption];
    newOptions.sort((a, b) => a.number - b.number);
    replace(newOptions);
  };

  const removeOption = (optionIndex: number) => {
    const deleteOptionNumber = optionIndex + 1;

    const updatedOptions = options
      .filter((option) => option.number !== deleteOptionNumber)
      .map((option) => {
        let optionNumber = option.number;
        if (option.number > deleteOptionNumber) {
          optionNumber = optionNumber - 1;
        }
        return {
          number: optionNumber,
          description: option.description,
          descriptionImage: option.descriptionImage,
          ...(option.id && { id: option.id }),
        };
      });

    replace(updatedOptions);
  };

  return (
    <div className="flex flex-col relative p-0.5 pt-7 gap-2 ml-3 max-h-80 scrollbar-thumb-neutral-300 scrollbar-track-slate-100 scrollbar-thin overflow-auto">
      {options.map((option, index) => {
        const canRemoveQuestionOption = option.id
          ? canRemoveOptions && options.length > 1
          : options.length > 1;

        return (
          <EditQuestionChoice
            addOptionDisabled={options.length === 30}
            addAnotherOption={addAnotherOption}
            removeOption={removeOption}
            key={option.optionId}
            handleSaveQuestion={handleSaveQuestion}
            index={index}
            surveyId={surveyId}
            canRemoveOption={canRemoveQuestionOption}
          />
        );
      })}
    </div>
  );
};

export default EditQuestionChoiceList;
