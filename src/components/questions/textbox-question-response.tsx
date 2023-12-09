import { TextboxQuestion } from "@/lib/types";
import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type TextboxQuestionResponseProps = {
  question: TextboxQuestion;
  isPreview?: boolean;
};

const TextboxQuestionResponse = ({
  question,
  isPreview = false,
}: TextboxQuestionResponseProps) => {
  return isPreview ? (
    <div className="max-w-xs">
      <Input placeholder="" />
    </div>
  ) : (
    <FormField
      control={undefined}
      name={`sdad215454545`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder="Enter response" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextboxQuestionResponse;
