import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import SurveyResponseTableAction from "./survey-response-table-action";
import SortableHeader from "@/components/data-table/sortable-header";
import { SurveyResponse } from "@/types/survey";
import { Collector, CollectorType } from "@/types/collector";

export const columns: ColumnDef<SurveyResponse>[] = [
  {
    id: "displayNumber",
    cell: ({ row }) => {
      const displayNumber = row.original.display_number;

      return <div className="text-md">{displayNumber}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <SortableHeader
          isSortedValue={isSortedValue}
          toggleSorting={column.toggleSorting}
        >
          Status
        </SortableHeader>
      );
    },

    cell: ({ row }) => {
      const isCompleteResponse = row.getValue("status") === "complete";
      return (
        <div className=" flex items-center">
          {isCompleteResponse ? (
            <div className="py-1 px-2 bg-green-500 text-white font-medium rounded-sm">
              Complete
            </div>
          ) : (
            <div className="py-1 px-2 bg-yellow-200 text-black font-medium rounded-sm">
              Incomplete
            </div>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <SortableHeader
          isSortedValue={isSortedValue}
          toggleSorting={column.toggleSorting}
        >
          Last Modified
        </SortableHeader>
      );
    },

    cell: ({ row }) => {
      const lastModifiedVal: string = row.getValue("updated_at");
      const lastModifiedDate = new Date(lastModifiedVal);
      const formattedDate = format(lastModifiedDate, "yyyy-MM-dd HH:mm");

      return (
        <div>
          <time dateTime={lastModifiedDate.toISOString()}>{formattedDate}</time>
        </div>
      );
    },
  },
  {
    accessorKey: "collector",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <SortableHeader
          isSortedValue={isSortedValue}
          toggleSorting={column.toggleSorting}
        >
          Collector
        </SortableHeader>
      );
    },
    cell: ({ row }) => {
      const collector: Collector = row.getValue("collector");
      const collectorName = collector.name;
      const collectorType =
        collector.type === CollectorType.web_link && "Weblink";

      return (
        <div>
          {collectorName} ({collectorType})
        </div>
      );
    },
  },
  {
    accessorKey: "ip_address",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <SortableHeader
          isSortedValue={isSortedValue}
          toggleSorting={column.toggleSorting}
        >
          IP Address
        </SortableHeader>
      );
    },
    cell: ({ row }) => {
      const ipAddress: string = row.getValue("ip_address");

      return <div>{ipAddress}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <SurveyResponseTableAction
          collectorId={row.original.collectorId}
          responseId={row.original.id}
        />
      );
    },
  },
];
