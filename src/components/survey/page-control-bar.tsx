"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useSurveyPages from "@/lib/hooks/useSurveyPages";
import { Button } from "../ui/button";
import useCreateSurveyPage from "@/lib/hooks/useCreateSurveyPage";
import { useToast } from "../ui/use-toast";
import PageActions from "./page-actions";

type PageControlBarProps = {
  surveyId: string;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
  currentPageNumber: number;
};

const PageControlBar = ({
  surveyId,
  setCurrentPageNumber,
  currentPageNumber,
}: PageControlBarProps) => {
  const { toast } = useToast();
  const { surveyPages } = useSurveyPages(surveyId);
  const { createPageMutation, isPending } = useCreateSurveyPage();

  const handleCreateSurveyPage = () => {
    const createPageToast = toast({
      variant: "destructive",
      title: "Saving question...",
    });

    createPageMutation(
      { surveyId },
      {
        onSuccess(data) {
          createPageToast.dismiss();
          setCurrentPageNumber(data.number);
        },
      }
    );
  };

  return (
    <div className="mb-4 flex items-end justify-between gap-2">
      <div className="flex flex-1 gap-2">
        <div className="max-w-xs flex-1 flex items-end">
          <Select
            value={currentPageNumber.toString()}
            onValueChange={(value) => {
              setCurrentPageNumber(Number(value));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>

            <SelectContent>
              {surveyPages!.map((page) => (
                <SelectItem key={page.id} value={page.number.toString()}>
                  {"Page " + page.number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleCreateSurveyPage}
          disabled={isPending}
          variant="default"
          size="default"
        >
          Create Page
        </Button>
      </div>
      <div>
        <PageActions surveyId={surveyId} />
      </div>
    </div>
  );
};

export default PageControlBar;
