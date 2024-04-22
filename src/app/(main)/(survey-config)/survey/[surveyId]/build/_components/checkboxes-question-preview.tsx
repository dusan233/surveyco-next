import { MultipleChoiceQuestion } from "@/lib/types";
import React from "react";
import { FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import DOMPurify from "isomorphic-dompurify";

type CheckboxesQuestionPreviewProps = {
  question: MultipleChoiceQuestion;
};
const CheckboxesQuestionPreview = ({
  question,
}: CheckboxesQuestionPreviewProps) => {
  return (
    <div className="flex flex-col space-y-5">
      {question.options.map((option) => (
        <FormItem
          key={option.id}
          className="flex items-center space-x-3 space-y-0"
        >
          <Checkbox tabIndex={-1} aria-readonly checked={false} />

          <label
            className="w-full min-w-[1%] text-lg break-words peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal"
            htmlFor={option.id}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(option.description),
            }}
          ></label>
        </FormItem>
      ))}
    </div>
  );
};

export default CheckboxesQuestionPreview;
