"use client";

import React from "react";
import CollectorsHeader from "./collectors-header";
import { DataTable as CollectorsTable } from "@/components/data-table/data-table";
import useSurveyCollectors from "@/lib/hooks/useSurveyCollectors";
import { columns } from "./collectors-table-columns";

type SurveyCollectorsProps = {
  surveyId: string;
};

const SurveyCollectors = ({ surveyId }: SurveyCollectorsProps) => {
  const {
    collectors,
    pageCount,
    pagination,
    sorting,
    setPagination,
    setSorting,
    isFetching,
  } = useSurveyCollectors(surveyId);

  console.log(collectors);

  return (
    <div>
      <CollectorsHeader surveyId={surveyId} />
      <CollectorsTable
        pageCount={pageCount}
        paginationState={pagination}
        sortingState={sorting}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        loading={isFetching}
        data={collectors!}
        columns={columns}
        noDataMsg="No collectors"
      />
    </div>
  );
};

export default SurveyCollectors;
