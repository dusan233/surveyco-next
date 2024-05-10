"use client";

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
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { convert } from "html-to-text";
import { useFormContext } from "react-hook-form";
import { DropdownQuestion } from "@/types/question";

type DropdownQuestionResponseProps = {
  name: string;
  question: DropdownQuestion;
  defaultValue: string;
};

const DropdownQuestionResponse = ({
  name,
  question,
  defaultValue,
}: DropdownQuestionResponseProps) => {
  const { control } = useFormContext();
  const options = question.options;

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
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {convert(DOMPurify.sanitize(option.description))}
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
