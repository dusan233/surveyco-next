"use client";

import useSurveyIndividualResponses from "../../individual/useSurveIndividualResponses";
import React from "react";
import { DataTable as IndividualResponsesTable } from "@/components/data-table/data-table";
import { columns } from "../survey-responses-table-columns";
import IndividualResponseDialog from "./individual-response-modal";
import { useIndividualResponseStore } from "../../individual/useIndividualResponseStore";
import { Survey } from "@/types/survey";
import useToastError from "@/hooks/useToastError";
import { getErrorMessage } from "@/lib/util/errorUtils";
import { useDataTableState } from "@/hooks/useDataTableState";

type SurveyResponsesProps = {
  survey: Survey;
};

const IndividualResponses = ({ survey }: SurveyResponsesProps) => {
  const { setPagination, setSorting, sortObj, sorting, pagination } =
    useDataTableState({ pageSize: 30 });
  const { responses, pageCount, isFetching, isError, error } =
    useSurveyIndividualResponses({
      surveyId: survey.id,
      sort: sortObj,
      page: pagination.pageIndex + 1,
    });
  const { showDialog, responseId, setShowDialog } =
    useIndividualResponseStore();

  useToastError(isError, getErrorMessage(error));

  return (
    <>
      <IndividualResponseDialog
        onClose={() => setShowDialog(false)}
        isOpen={showDialog}
        surveyId={survey.id}
        responseId={responseId}
        dataTableState={{ sort: sortObj, page: pagination.pageIndex + 1 }}
      />
      <h1 className="text-2xl mb-5">Individual Responses</h1>
      <IndividualResponsesTable
        pageCount={pageCount!}
        loading={isFetching}
        columns={columns}
        data={responses!}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        sortingState={sorting}
        paginationState={pagination}
        totalItemCount={survey.responses_count}
        noDataMsg="No responses"
      />
    </>
  );
};

export default IndividualResponses;
