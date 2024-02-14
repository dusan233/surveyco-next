import React from "react";
import { Control, SubmitHandler, useFieldArray } from "react-hook-form";
import EditQuestionChoice from "./edit-question-choice";
import { z } from "zod";
import { multiChoiceQuestionSchema } from "@/lib/validationSchemas";

type EditQuestionChoiceListProps = {
  control: Control<z.infer<typeof multiChoiceQuestionSchema>, any>;
  surveyId: string;
  handleSaveQuestion: SubmitHandler<any>;
};

const EditQuestionChoiceList = ({
  control,
  surveyId,
  handleSaveQuestion,
}: EditQuestionChoiceListProps) => {
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
      descriptionImage: null,
    });
  };

  const removeOption = (optionIndex: number) => {
    remove(optionIndex);
  };

  return (
    <div className="flex flex-col gap-2 ml-3">
      {options.map((option, index) => {
        return (
          <EditQuestionChoice
            addAnotherOption={addAnotherOption}
            removeOption={removeOption}
            removeDisabled={options.length === 1}
            key={option.optionId}
            handleSaveQuestion={handleSaveQuestion}
            index={index}
            surveyId={surveyId}
          />
        );
      })}
    </div>
  );
};

export default EditQuestionChoiceList;
