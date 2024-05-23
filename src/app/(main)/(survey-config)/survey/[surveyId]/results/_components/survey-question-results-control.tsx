import { Card } from "@/components/ui/card";
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
    <Card className="space-y-2">
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
    </Card>
  );
};

export default SurveyQuestionResultsControl;
