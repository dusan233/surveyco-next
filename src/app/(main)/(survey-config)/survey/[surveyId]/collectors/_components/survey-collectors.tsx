"use client";

import React from "react";
import CollectorsHeader from "./collectors-header";
import { DataTable as CollectorsTable } from "@/components/data-table/data-table";
import useSurveyCollectors from "@/hooks/useSurveyCollectors";
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
    lastSuccessData,
  } = useSurveyCollectors(surveyId);

  return (
    <div>
      <CollectorsHeader surveyId={surveyId} />
      <CollectorsTable
        pageCount={pageCount || lastSuccessData.current?.total_pages!}
        paginationState={pagination}
        sortingState={sorting}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        loading={isFetching}
        data={collectors! || lastSuccessData.current?.data}
        columns={columns}
        noDataMsg="No collectors"
      />
    </div>
  );
};

export default SurveyCollectors;
