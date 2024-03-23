"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSurveyPages from "@/lib/hooks/useSurveyPages";
import { Button } from "@/components/ui/button";
import useCreateSurveyPage from "../hooks/useCreateSurveyPage";
import { useToast } from "@/components/ui/use-toast";
import PageActions from "./page-actions";
import useBuildQuestionsContext from "../hooks/useBuildQuestionsContext";

type PageControlBarProps = {
  surveyId: string;
};

const PageControlBar = ({ surveyId }: PageControlBarProps) => {
  const setCurrentPage = useBuildQuestionsContext((s) => s.setCurrentPage);
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const { toast } = useToast();
  const { surveyPages } = useSurveyPages(surveyId);
  const { createPageMutation, isPending } = useCreateSurveyPage();

  const handleCreateSurveyPage = () => {
    const createPageToast = toast({
      variant: "default",
      title: "Creating page...",
    });

    createPageMutation(
      { surveyId },
      {
        onSuccess(data) {
          createPageToast.dismiss();
          setCurrentPage(data);
        },
        onError(error) {
          toast({
            variant: "destructive",
            title: error.message,
          });
        },
      }
    );
  };

  return (
    <div className="mb-4 py-2 flex flex-col xs:flex-row xs:items-end bg-slate-100 xs:justify-between gap-2 sticky top-11 z-10">
      <div className="flex flex-1 items-center gap-5">
        <div className="max-w-xs flex-1 flex items-center">
          <Select
            value={currentPage!.id}
            onValueChange={(value) => {
              setCurrentPage(surveyPages!.find((page) => page.id === value)!);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select page" />
            </SelectTrigger>

            <SelectContent>
              {surveyPages!.map((page, index) => (
                <SelectItem key={page.id} value={page.id}>
                  {"Page " + (index + 1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleCreateSurveyPage}
          disabled={isPending}
          loading={isPending}
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
