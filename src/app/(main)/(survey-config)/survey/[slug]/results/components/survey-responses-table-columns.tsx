import { Button } from "@/components/ui/button";
import { Collector, CollectorType, SurveyResponse } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import SurveyResponseTableAction from "./survey-response-table-action";

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
        <button
          className="w-full flex gap-0.5 items-center"
          onClick={() => column.toggleSorting(isSortedValue === "asc")}
        >
          Status
          {isSortedValue &&
            (isSortedValue === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            ))}
        </button>
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
        <button
          className="w-full flex gap-0.5 items-center"
          onClick={() => column.toggleSorting(isSortedValue === "asc")}
        >
          Last Modified
          {isSortedValue &&
            (isSortedValue === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            ))}
        </button>
      );
    },

    cell: ({ row }) => {
      const lastModifiedVal: string = row.getValue("updated_at");
      const formattedDate = format(
        new Date(lastModifiedVal),
        "yyyy-MM-dd HH:mm"
      );

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "collector",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <button
          className="w-full flex gap-0.5 items-center"
          onClick={() => column.toggleSorting(isSortedValue === "asc")}
        >
          Collector
          {isSortedValue &&
            (isSortedValue === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            ))}
        </button>
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
        <button
          className="w-full flex gap-0.5 items-center"
          onClick={() => column.toggleSorting(isSortedValue === "asc")}
        >
          IP Addresss
          {isSortedValue &&
            (isSortedValue === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            ))}
        </button>
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
