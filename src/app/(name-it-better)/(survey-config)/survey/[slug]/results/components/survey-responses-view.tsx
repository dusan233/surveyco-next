"use client";

import useSurveyResponses from "@/lib/hooks/useSurveyResponses";
import { QuizResponseData } from "@/lib/types";
import React, { useCallback } from "react";
import { SurveyResponsesTable } from "./survey-responses-table";
import { columns } from "./survey-responses-table-columns";
import { useIndividualResponseStore } from "@/lib/hooks/store/useIndividualResponseStore";
import IndividualResponseDialog from "./individual-response-dialog";

type SurveyResponsesProps = {
  survey: QuizResponseData;
};

const SurveyResponsesView = ({ survey }: SurveyResponsesProps) => {
  const {
    responses,
    pagination,
    setPagination,
    pageCount,
    isLoading,
    isFetching,
    sorting,
    setSorting,
  } = useSurveyResponses(survey.id);
  const { showDialog, collectorId, responseId, setShowDialog } =
    useIndividualResponseStore();

  return (
    <div>
      <IndividualResponseDialog
        onOpenChange={setShowDialog}
        isOpen={showDialog}
        collectorId={collectorId}
        surveyId={survey.id}
        responseId={responseId}
      />
      <SurveyResponsesTable
        pageCount={pageCount}
        loading={isFetching}
        columns={columns}
        data={responses!}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        sortingState={sorting}
        paginationState={pagination}
        responsesCount={survey.responses_count}
      />
    </div>
  );
};

export default SurveyResponsesView;
