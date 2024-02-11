import { TextboxQuestion } from "@/lib/types";
import React from "react";
import { Input } from "@/components/ui/input";

type TextboxQuestionResponseProps = {
  question: TextboxQuestion;
  isPreview?: boolean;
  name?: string;
};

const TextboxQuestionResponse = ({
  question,
  name,
  isPreview = false,
}: TextboxQuestionResponseProps) => {
  return isPreview ? (
    <div className="max-w-xs">
      <Input readOnly tabIndex={-1} placeholder="" />
    </div>
  ) : null;
};

export default TextboxQuestionResponse;
