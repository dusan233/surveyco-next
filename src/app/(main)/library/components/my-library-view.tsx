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
    lastSuccessData,
  } = useUserSurveys();

  return (
    <>
      <h1 className="text-2xl mb-5">My Surveys</h1>
      <UserSurveysTable
        columns={columns}
        loading={isFetching}
        data={surveys! || lastSuccessData.current?.data!}
        pageCount={pageCount || lastSuccessData.current?.total_pages!}
        paginationState={pagination}
        sortingState={sorting}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        noDataMsg="No surveys."
      />
    </>
  );
};

export default MyLibraryView;
