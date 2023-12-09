import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { MultipleChoiceQuestion } from "@/lib/types";

type MultiChoiceQuestionResponseProps = {
  question: MultipleChoiceQuestion;
  isPreview?: boolean;
};

const MultiChoiceQuestionResponse = ({
  question,
  isPreview = false,
}: MultiChoiceQuestionResponseProps) => {
  return isPreview ? (
    <RadioGroup defaultValue={""} className="flex flex-col space-y-3">
      {question.options.map((option) => (
        <FormItem
          key={option.id}
          className="flex items-center space-x-3 space-y-0"
        >
          <RadioGroupItem value={option.id} />

          <label
            className="text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal"
            htmlFor={option.id}
            dangerouslySetInnerHTML={{ __html: option.description }}
          ></label>
        </FormItem>
      ))}
    </RadioGroup>
  ) : (
    <FormField
      control={undefined}
      shouldUnregister
      name="dasdsa"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={""}
              className="flex flex-col space-y-1"
            >
              {question.options.map((option) => (
                <FormItem
                  key={option.id}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.id} />
                  </FormControl>
                  <FormLabel
                    dangerouslySetInnerHTML={{
                      __html: option.description,
                    }}
                    className="font-normal"
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
