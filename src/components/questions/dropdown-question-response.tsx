import { MultipleChoiceQuestion } from "@/lib/types";
import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type DropdownQuestionResponseProps = {
  question: MultipleChoiceQuestion;
  isPreview?: boolean;
};

const DropdownQuestionResponse = ({
  question,
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
  ) : (
    <FormField
      control={undefined}
      name={`dadasd`}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={""}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {question.options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DropdownQuestionResponse;
