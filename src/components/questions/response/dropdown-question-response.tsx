import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultipleChoiceQuestion } from "@/lib/types";
import React from "react";
import { useFormContext } from "react-hook-form";

type DropdownQuestionResponseProps = {
  name: string;
  question: MultipleChoiceQuestion;
  defaultValue: string;
};

const DropdownQuestionResponse = ({
  name,
  question,
  defaultValue,
}: DropdownQuestionResponseProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="max-w-xs">
          <Select onValueChange={field.onChange} defaultValue={defaultValue}>
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
