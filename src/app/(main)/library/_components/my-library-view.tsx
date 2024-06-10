"use client";

import useUserSurveys from "../useUserSurveys";
import React from "react";
import { columns } from "./surveys-table-columns";
import { DataTable as UserSurveysTable } from "@/components/data-table/data-table";
import CreateSurveyModal from "@/components/survey/create-survey-modal";
import { useDisclosure } from "@/hooks/useDisclosure";
import { Button } from "@/components/ui/button";

const MyLibraryView = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
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
      <CreateSurveyModal isOpen={isOpen} onClose={onClose} />
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
      <div className="mt-5">
        <Button onClick={() => onOpen()}>Create survey</Button>
      </div>
    </>
  );
};

export default MyLibraryView;
