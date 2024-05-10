"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultichoiceQuestion } from "@/types/question";
import DOMPurify from "isomorphic-dompurify";
import React from "react";
import { useFormContext } from "react-hook-form";

type MultichoiceQuestionResponseProps = {
  name: string;
  question: MultichoiceQuestion;
  defaultValue: string;
};

const MultiChoiceQuestionResponse = ({
  question,
  name,
  defaultValue,
}: MultichoiceQuestionResponseProps) => {
  const { control } = useFormContext();
  const choices = question.options;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={defaultValue}
              className="flex flex-col space-y-1"
            >
              {choices.map((option) => (
                <FormItem
                  key={option.id}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.id} />
                  </FormControl>
                  <FormLabel
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(option.description),
                    }}
                    className="font-normal  min-w-[1%] break-words text-lg"
                  ></FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MultiChoiceQuestionResponse;
