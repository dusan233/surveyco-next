"use client";

import React, { useId } from "react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Question, QuestionType, UnsavedQuestion } from "@/lib/types";

type QuestionSettingsProps = {
  question: Question | UnsavedQuestion;
};

const QuestionSettings = ({ question }: QuestionSettingsProps) => {
  const { control } = useFormContext();
  const id = useId();
  const qType = question.type;

  return (
    <div className=" mt-6 rounded-sm text-gray-600 bg-amber-100 shadow-sm">
      <div className=" border-b border-gray-300">
        <FormField
          control={control}
          name={"required"}
          render={({ field }) => {
            return (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <FormLabel
                    htmlFor={id}
                    className="font-normal cursor-pointer w-full p-2.5 pl-3 flex items-center gap-1.5 text-xs"
                  >
                    <Checkbox
                      id={id}
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                      }}
                    />
                    Require an Answer
                  </FormLabel>
                </FormControl>
              </FormItem>
            );
          }}
        />
      </div>
      {qType !== QuestionType.textbox && (
        <div>
          <FormField
            control={control}
            name={"required"}
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <FormLabel
                      htmlFor={id}
                      className="font-normal w-full p-2.5 pl-3 flex cursor-pointer items-center gap-1.5 text-xs"
                    >
                      <Checkbox
                        id={id}
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                        }}
                      />
                      Randomize Choices
                    </FormLabel>
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionSettings;
