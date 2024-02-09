import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SurveyPage } from "@/lib/types";
import React from "react";

type SurveyQuestionResultsControlProps = {
  surveyResponseCount: number;
  surveyPages: SurveyPage[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const SurveyQuestionResultsControl = ({
  surveyResponseCount,
  page,
  surveyPages,
  setPage,
}: SurveyQuestionResultsControlProps) => {
  return (
    <div className="p-5 space-y-2 shadow-sm rounded-lg bg-white">
      <h2 className="font-bold text-lg">
        Total responses: {surveyResponseCount}
      </h2>
      <div className="max-w-xs">
        <Select
          value={page.toString()}
          onValueChange={(value) => {
            setPage(Number(value));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select respondent" />
          </SelectTrigger>

          <SelectContent>
            {surveyPages!.map((page) => (
              <SelectItem key={page.id} value={page.number.toString()}>
                Page {page.number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SurveyQuestionResultsControl;
