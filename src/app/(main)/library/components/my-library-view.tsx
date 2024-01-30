"use client";

import useUserSurveys from "@/lib/hooks/useUserSurveys";
import React from "react";
import { columns } from "./surveys-table-columns";
import { DataTable as UserSurveysTable } from "@/components/data-table/data-table";

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
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl mb-5">My Surveys</h1>
      <UserSurveysTable
        columns={columns}
        loading={isFetching}
        data={surveys!}
        pageCount={pageCount}
        paginationState={pagination}
        sortingState={sorting}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        noDataMsg="No surveys."
      />
    </div>
  );
};

export default MyLibraryView;
