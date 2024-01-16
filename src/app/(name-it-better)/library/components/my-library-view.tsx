"use client";

import useUserSurveys from "@/lib/hooks/useUserSurveys";
import React from "react";
import { SurveyResponsesTable } from "../../(survey-config)/survey/[slug]/results/components/survey-responses-table";
import { columns } from "./surveys-table-columns";

const MyLibraryView = () => {
  const {
    surveys,
    pageCount,
    pagination,
    sorting,
    setPagination,
    setSorting,
    isFetching,
  } = useUserSurveys();

  return (
    <div>
      <h1 className="text-2xl mb-5">My Surveys</h1>
      <SurveyResponsesTable
        columns={columns}
        loading={isFetching}
        data={surveys!}
        pageCount={pageCount}
        paginationState={pagination}
        sortingState={sorting}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
      />
    </div>
  );
};

export default MyLibraryView;
