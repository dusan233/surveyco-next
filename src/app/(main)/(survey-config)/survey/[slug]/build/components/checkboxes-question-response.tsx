import { MultipleChoiceQuestion } from "@/lib/types";
import React from "react";
import { FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

type CheckboxesQuestionResponseProps = {
  question: MultipleChoiceQuestion;
  isPreview?: boolean;
  name?: string;
};
const CheckboxesQuestionResponse = ({
  question,
  name,
  isPreview = false,
}: CheckboxesQuestionResponseProps) => {
  return isPreview ? (
    <div className="flex flex-col space-y-5">
      {question.options.map((option) => (
        <FormItem
          key={option.id}
          className="flex items-center space-x-3 space-y-0"
        >
          <Checkbox tabIndex={-1} aria-readonly checked={false} />

          <label
            className="text-lg leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal"
            htmlFor={option.id}
            dangerouslySetInnerHTML={{
              __html: option.description,
            }}
          ></label>
        </FormItem>
      ))}
    </div>
  ) : null;
};

export default CheckboxesQuestionResponse;
