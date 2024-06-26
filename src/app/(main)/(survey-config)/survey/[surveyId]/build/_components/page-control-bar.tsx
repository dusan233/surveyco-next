"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSurveyPages from "@/hooks/useSurveyPages";
import { Button } from "@/components/ui/button";
import useCreateSurveyPage from "../_hooks/useCreateSurveyPage";
import PageActions from "./page-actions";
import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";

import Spinner from "@/components/ui/spinner";
import { getErrorMessage } from "@/lib/util/errorUtils";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import { toastError } from "@/lib/util/toastError";

type PageControlBarProps = {
  surveyId: string;
};

const PageControlBar = ({ surveyId }: PageControlBarProps) => {
  const setCurrentPage = useBuildQuestionsContext((s) => s.setCurrentPage);
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);

  const { surveyPages } = useSurveyPages(surveyId);
  const { createPageMutationAsync, isPending } = useCreateSurveyPage();

  const handleCreateSurveyPage = async () => {
    try {
      const data = await createPageMutationAsync({ surveyId });
      setCurrentPage(data);
    } catch (err) {
      toastError(getErrorMessage(err));
    }
  };

  useLoadingToast(isPending, "Creating page...");

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
          variant="default"
          size="default"
        >
          Create Page {isPending && <Spinner size="xs" />}
        </Button>
      </div>
      <div>
        <PageActions surveyId={surveyId} />
      </div>
    </div>
  );
};

export default PageControlBar;
