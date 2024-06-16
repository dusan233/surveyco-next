"use client";

import React from "react";
import CollectorsHeader from "./collectors-header";
import { DataTable as CollectorsTable } from "@/components/data-table/data-table";
import useSurveyCollectors from "@/hooks/useSurveyCollectors";
import { columns } from "./collectors-table-columns";
import useToastError from "@/hooks/useToastError";
import { getErrorMessage } from "@/lib/util/errorUtils";
import { useDataTableState } from "@/hooks/useDataTableState";

type SurveyCollectorsProps = {
  surveyId: string;
};

const SurveyCollectors = ({ surveyId }: SurveyCollectorsProps) => {
  const { pagination, setPagination, setSorting, sortObj, sorting } =
    useDataTableState({ pageSize: 15 });
  const { collectors, pageCount, isFetching, isError, error } =
    useSurveyCollectors({
      surveyId,
      sort: sortObj,
      page: pagination.pageIndex + 1,
    });

  useToastError(isError, getErrorMessage(error));

  return (
    <div>
      <CollectorsHeader surveyId={surveyId} />
      <CollectorsTable
        pageCount={pageCount!}
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
