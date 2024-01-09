"use client";

import useSurveyResponses from "@/lib/hooks/useSurveyResponses";
import { QuizResponseData } from "@/lib/types";
import React, { useCallback } from "react";
import { SurveyResponsesTable } from "./survey-responses-table";
import { columns } from "./survey-responses-table-columns";

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

  // const updatePage = useCallback(
  //   (newPage: number) => {
  //     setPage(newPage);
  //   },
  //   [setPage]
  // );

  return (
    <div>
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
