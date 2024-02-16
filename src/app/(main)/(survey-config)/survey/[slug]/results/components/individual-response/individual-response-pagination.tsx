"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";

import { SurveyPage, SurveyResponse } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useIndividualResponseStore } from "../../individual/useIndividualResponseStore";

interface IndividualResponsePaginationProps {
  surveyPages: SurveyPage[];
  surveyResponses: SurveyResponse[];
  selectedResponseId: string;
  getCanPreviousResponse: () => boolean;
  handlePreviousResponse: () => void;
  getCanNextResponse: () => boolean;
  handleNextResponse: () => void;
  isLoading: boolean;
  responsePage: number;
  setResponsePage: React.Dispatch<React.SetStateAction<number>>;
}

const IndividualResponsePagination = ({
  surveyPages,
  surveyResponses,
  selectedResponseId,
  getCanPreviousResponse,
  handlePreviousResponse,
  getCanNextResponse,
  handleNextResponse,
  isLoading,
  responsePage,
  setResponsePage,
}: IndividualResponsePaginationProps) => {
  const setResponseData = useIndividualResponseStore(
    (state) => state.setResponseData
  );

  return (
    <>
      <div className="flex gap-2 justify-between border items-center rounded-md p-2 bg-slate-50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            disabled={!getCanPreviousResponse()}
            onClick={handlePreviousResponse}
          >
            <ChevronLeft />
          </Button>
          <div className="max-w-20">
            <Select
              value={selectedResponseId}
              onValueChange={(value) => {
                setResponseData({ responseId: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select respondent" />
              </SelectTrigger>

              <SelectContent>
                {surveyResponses!.map((response) => (
                  <SelectItem key={response.id} value={response.id}>
                    Respondent #{response.display_number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            disabled={!getCanNextResponse()}
            onClick={handleNextResponse}
          >
            <ChevronRight />
          </Button>
        </div>
        {isLoading && <Spinner size="sm" />}
      </div>
      <div>
        <div className="max-w-20">
          <Select
            value={responsePage.toString()}
            onValueChange={(value) => {
              setResponsePage(Number(value));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Page" />
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
    </>
  );
};

export default IndividualResponsePagination;
