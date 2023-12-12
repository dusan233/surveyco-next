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
      <Input readOnly tabIndex={-1} placeholder="" />
    </div>
  ) : (
    <FormField
      control={undefined}
      name={`sdad215454545`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input className="pointer-events-none" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextboxQuestionResponse;
