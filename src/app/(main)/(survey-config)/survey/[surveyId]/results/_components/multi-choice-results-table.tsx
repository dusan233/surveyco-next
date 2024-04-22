import { DataTable } from "@/components/ui/data-table";

import React from "react";
import { columns } from "./multi-choice-results-table-columns";

type MultiChoiceResultsTableProps = {
  data: {
    description: string;
    percenteges: number;
    answeredCount: number;
    id: string;
  }[];
};

const MultiChoiceResultsTable = ({ data }: MultiChoiceResultsTableProps) => {
  return <DataTable columns={columns} data={data} />;
};

export default MultiChoiceResultsTable;
