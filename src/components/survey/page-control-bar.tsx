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
import { SurveyPage } from "@/lib/types";

type PageControlBarProps = {
  surveyId: string;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
  currentPageNumber: number;
  currentPage: SurveyPage;
};

const PageControlBar = ({
  surveyId,
  setCurrentPageNumber,
  currentPageNumber,
  currentPage,
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
    <div className="mb-4 py-2 flex items-end bg-slate-100 justify-between gap-2 sticky top-12 z-10">
      <div className="flex flex-1 items-center gap-5">
        <div className="max-w-xs flex-1 flex items-center">
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
        <PageActions
          setCurrentPageNumber={setCurrentPageNumber}
          currentPage={currentPage}
          surveyId={surveyId}
        />
      </div>
    </div>
  );
};

export default PageControlBar;
