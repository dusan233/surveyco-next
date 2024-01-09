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

export const columns: ColumnDef<SurveyResponse>[] = [
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
      return (
        <div className=" flex items-center">
          {row.index % 2 ? (
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
      return <div>178.148.100.108</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex text-blue-500 justify-end">
          <button>View</button>
        </div>
      );
    },
  },
];
