import { Button } from "@/components/ui/button";
import { Collector, CollectorType, SurveyResponse } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<SurveyResponse>[] = [
  {
    accessorKey: "status",
    header: "Status",
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
    header: "Last Modified",
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
    header: "Collector",
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
    header: "IP Addresss",
    cell: ({ row }) => {
      return <div>178.148.100.108</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Button size={"sm"}>View</Button>
        </div>
      );
    },
  },
];
