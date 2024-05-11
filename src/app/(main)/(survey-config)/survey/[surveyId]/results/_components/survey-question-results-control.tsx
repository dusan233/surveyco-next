import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SurveyPage } from "@/types/survey";
import React from "react";

type SurveyQuestionResultsControlProps = {
  surveyResponseCount: number;
  surveyPages: SurveyPage[];
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
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
          value={page}
          onValueChange={(value) => {
            setPage(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select respondent" />
          </SelectTrigger>

          <SelectContent>
            {surveyPages!.map((page) => (
              <SelectItem key={page.id} value={page.id}>
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
