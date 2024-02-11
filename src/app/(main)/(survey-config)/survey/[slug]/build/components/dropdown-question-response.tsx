import { MultipleChoiceQuestion } from "@/lib/types";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DropdownQuestionResponseProps = {
  question: MultipleChoiceQuestion;
  isPreview?: boolean;
  name?: string;
};

const DropdownQuestionResponse = ({
  question,
  name,
  isPreview = false,
}: DropdownQuestionResponseProps) => {
  return isPreview ? (
    <div className="max-w-xs">
      <Select defaultValue={""}>
        <SelectTrigger tabIndex={-1} aria-readonly>
          <SelectValue placeholder="" />
        </SelectTrigger>

        <SelectContent>
          {question.options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.description}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ) : null;
};

export default DropdownQuestionResponse;
