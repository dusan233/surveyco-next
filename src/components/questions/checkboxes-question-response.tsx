import { MultipleChoiceQuestion } from "@/lib/types";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";

type CheckboxesQuestionResponseProps = {
  question: MultipleChoiceQuestion;
  isPreview: boolean;
};
const CheckboxesQuestionResponse = ({
  question,
  isPreview,
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
            className="text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal"
            htmlFor={option.id}
            dangerouslySetInnerHTML={{
              __html: option.description,
            }}
          ></label>
        </FormItem>
      ))}
    </div>
  ) : (
    <FormField
      control={undefined}
      name={`sadasd123`}
      render={() => (
        <FormItem>
          {question.options.map((option) => (
            <FormField
              key={option.id}
              control={undefined}
              name={`sadasdasd4466`}
              render={({ field }) => {
                return (
                  <FormItem
                    key={option.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([
                                ...(field.value as string[]),
                                option.id,
                              ])
                            : field.onChange(
                                (field.value as string[]).filter(
                                  (value) => value !== option.id
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel
                      className="font-normal"
                      dangerouslySetInnerHTML={{
                        __html: option.description,
                      }}
                    />
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxesQuestionResponse;
