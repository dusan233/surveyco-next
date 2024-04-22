"use client";

import React from "react";
import { Input } from "@/components/ui/input";

const TextboxQuestionPreview = () => {
  return (
    <div className="max-w-xs">
      <Input readOnly tabIndex={-1} placeholder="" />
    </div>
  );
};

export default TextboxQuestionPreview;
