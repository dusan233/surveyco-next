import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { RichTextEditor } from "../rich-text";
import { Option } from "@/lib/types";
import { Control, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { FaPlus, FaMinus } from "react-icons/fa6";

type QuestionOptionProps = {
  option: Option;
  control: Control<any, any>;
  index: number;
  removeOption: (optionIndex: number) => void;
  removeDisabled: boolean;
  addAnotherOption: (currentIndex: number) => void;
};

const QuestionOption = ({
  control,
  index,
  addAnotherOption,
  removeOption,
  removeDisabled,
}: QuestionOptionProps) => {
  const { getValues } = useFormContext();
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <FormField
          control={control}
          name={`options.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RichTextEditor
                  content={getValues(`options.${index}.description`)}
                  placeholder="Enter an answer choice"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex justify-start gap-2">
        <button
          type="button"
          onClick={() => addAnotherOption(index)}
          title="Add another option"
          className="rounded-full inline-flex justify-center hover:border-neutral-400 items-center w-8 h-8 border"
        >
          <FaPlus />
        </button>
        {!removeDisabled && (
          <button
            type="button"
            onClick={() => removeOption(index)}
            title="Delete this option"
            className="rounded-full inline-flex justify-center hover:border-neutral-400 items-center w-8 h-8 border"
          >
            <FaMinus />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionOption;
