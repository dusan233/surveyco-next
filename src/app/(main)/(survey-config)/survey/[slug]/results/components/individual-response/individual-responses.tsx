"use client";

import useSurveyIndividualResponses from "@/app/(main)/(survey-config)/survey/[slug]/results/individual/useSurveIndividualResponses";
import { QuizResponseData } from "@/lib/types";
import React from "react";
import { DataTable as IndividualResponsesTable } from "@/components/data-table/data-table";
import { columns } from "../survey-responses-table-columns";

import IndividualResponseDialog from "./individual-response-dialog";
import { useIndividualResponseStore } from "../../individual/useIndividualResponseStore";

type SurveyResponsesProps = {
  survey: QuizResponseData;
};

const IndividualResponses = ({ survey }: SurveyResponsesProps) => {
  const {
    responses,
    pagination,
    setPagination,
    pageCount,
    isFetching,
    sorting,
    setSorting,
    lastSuccessData,
  } = useSurveyIndividualResponses(survey.id);
  const { showDialog, responseId, setShowDialog } =
    useIndividualResponseStore();

  return (
    <>
      <IndividualResponseDialog
        onOpenChange={setShowDialog}
        isOpen={showDialog}
        surveyId={survey.id}
        responseId={responseId}
      />
      <h1 className="text-2xl mb-5">Individual Responses</h1>
      <IndividualResponsesTable
        pageCount={pageCount || lastSuccessData.current?.total_pages!}
        loading={isFetching}
        columns={columns}
        data={responses! || lastSuccessData.current?.data}
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
