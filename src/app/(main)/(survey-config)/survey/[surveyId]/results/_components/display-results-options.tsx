import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuestionResult } from "@/lib/types";
import { getQuestionChartTypes } from "@/lib/util/questionUtils";
import { CheckedState } from "@radix-ui/react-checkbox";
import React from "react";

type DisplayResultsOptionsProps = {
  questionResult: QuestionResult;
  showChartResults: CheckedState;
  showTableResults: CheckedState;
  chartType: string;
  setShowChartResults: (value: React.SetStateAction<CheckedState>) => void;
  setShowTableResults: (value: React.SetStateAction<CheckedState>) => void;
  setChartType: React.Dispatch<React.SetStateAction<string>>;
};

const DisplayResultsOptions = ({
  questionResult,
  showChartResults,
  showTableResults,
  chartType,
  setChartType,
  setShowChartResults,
  setShowTableResults,
}: DisplayResultsOptionsProps) => {
  return (
    <div className="mt-10 flex gap-3">
      <div className="w-full flex flex-wrap gap-3">
        <div className="flex flex-row items-center space-x-3 space-y-0">
          <Label className="font-normal gap-2 flex flex-row items-center">
            <Checkbox
              checked={showChartResults}
              onCheckedChange={(checked) => {
                setShowChartResults(checked);
              }}
            />
            Chart
          </Label>
        </div>
        <div className="flex flex-row items-center space-x-3 space-y-0">
          <Label className="font-normal gap-2 flex flex-row items-center">
            <Checkbox
              checked={showTableResults}
              onCheckedChange={(checked) => {
                setShowTableResults(checked);
              }}
            />
            Data table
          </Label>
        </div>

        <div className="flex-1">
          <div className="max-w-[200px]">
            <Select onValueChange={setChartType} defaultValue={chartType}>
              <SelectTrigger>
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>

              <SelectContent>
                {getQuestionChartTypes(questionResult.type).map(
                  (option, index) => (
                    <SelectItem key={index} value={option.value}>
                      {option.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayResultsOptions;
