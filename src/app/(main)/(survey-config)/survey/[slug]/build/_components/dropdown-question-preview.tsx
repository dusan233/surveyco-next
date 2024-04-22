"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DropdownQuestionPreview = () => {
  return (
    <div className="max-w-xs">
      <Select defaultValue={""}>
        <SelectTrigger tabIndex={-1} aria-readonly>
          <SelectValue placeholder="" />
        </SelectTrigger>

        <SelectContent></SelectContent>
      </Select>
    </div>
  );
};

export default DropdownQuestionPreview;
