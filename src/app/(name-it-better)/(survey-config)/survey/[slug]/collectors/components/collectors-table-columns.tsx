"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Collector, CollectorType } from "@/lib/types";
import { format } from "date-fns";
import { useState } from "react";
import { Link } from "lucide-react";

export const getCollectorTypeIcon = (type: CollectorType) => {
  switch (type) {
    case CollectorType.web_link:
      return <Link />;
    default:
      return <Link />;
  }
};

export const columns: ColumnDef<Collector>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const typeVal: CollectorType = row.getValue("type");
      return (
        <div className="font-medium flex items-center">
          {getCollectorTypeIcon(typeVal)}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Name",
    cell: ({ row }) => {
      const dateVal: string = row.getValue("created_at");

      const formattedDate = format(dateVal, "dd/MM/yyyy");
      return <div className="font-medium text-sm">Created {formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusVal: string = row.getValue("status");
      const classNames = statusVal === "open" ? "bg-green-500" : "bg-red-500";

      return (
        <div className="font-medium text-white flex items-center">
          <div className={`p-1 px-2 uppercase rounded-sm ${classNames}`}>
            {statusVal}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "responses",
    header: "Responses",
  },
  {
    accessorKey: "updated_at",
    header: "Date modified",
    cell: ({ row }) => {
      const dateVal: string = row.getValue("updated_at");
      const formattedDate = format(dateVal, "dd/MM/yyyy");

      return <div className="font-medium text-sm">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <div className="font-medium text-sm">actions</div>;
    },
  },
];
