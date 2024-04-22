import React from "react";
import { FormItem } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultipleChoiceQuestion } from "@/lib/types";
import DOMPurify from "isomorphic-dompurify";

type MultiChoiceQuestionPreviewProps = {
  question: MultipleChoiceQuestion;
};

const MultiChoiceQuestionPreview = ({
  question,
}: MultiChoiceQuestionPreviewProps) => {
  return (
    <RadioGroup
      aria-readonly
      tabIndex={-1}
      defaultValue={""}
      className="flex flex-col space-y-3"
    >
      {question.options.map((option) => (
        <FormItem
          key={option.id}
          className="flex items-center space-x-3 space-y-0"
        >
          <RadioGroupItem value={option.id} />

          <label
            className="w-full min-w-[1%] text-lg break-words peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal"
            htmlFor={option.id}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(option.description),
            }}
          ></label>
        </FormItem>
      ))}
    </RadioGroup>
  );
};

export default MultiChoiceQuestionPreview;
