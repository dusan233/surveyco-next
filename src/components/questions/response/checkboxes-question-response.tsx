import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultipleChoiceQuestion } from "@/lib/types";
import DOMPurify from "dompurify";
import React from "react";
import { useFormContext } from "react-hook-form";

type CheckboxesQuestionResponseProps = {
  name: string;
  question: MultipleChoiceQuestion;
  defaultValue: string[];
};

const CheckboxesQuestionResponse = ({
  name,
  question,
  defaultValue,
}: CheckboxesQuestionResponseProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="flex flex-col space-y-3">
          {question.options.map((option) => (
            <FormField
              key={option.id}
              control={control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem
                    key={option.id}
                    className="flex flex-row items-center space-x-3 space-y-0"
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
                      className="font-normal text-lg"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(option.description),
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
