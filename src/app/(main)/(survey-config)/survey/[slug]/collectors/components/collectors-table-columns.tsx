"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Collector, CollectorType } from "@/lib/types";
import { format } from "date-fns";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import CollectorActions from "./collector-actions";
import CopyCollectorWebLink from "./copy-collector-web-link";
import SortableHeader from "@/components/data-table/sortable-header";

export const getCollectorTypeIcon = (type: CollectorType) => {
  switch (type) {
    case CollectorType.web_link:
      return <LinkIcon />;
    default:
      return <LinkIcon />;
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
    accessorKey: "name",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <SortableHeader
          isSortedValue={isSortedValue}
          toggleSorting={column.toggleSorting}
        >
          Name
        </SortableHeader>
      );
    },
    cell: ({ row }) => {
      const dateVal = row.original.created_at;

      const formattedDate = format(dateVal, "dd/MM/yyyy");
      return (
        <div className="font-medium text-sm space-y-1">
          <Link
            href={`/survey/${row.original.surveyId}/collector/${row.original.id}`}
            className="text-blue-700 hover:underline font-bold"
          >
            {row.original.name}
          </Link>

          <CopyCollectorWebLink collectorId={row.original.id} />
          <div>Created {formattedDate}</div>
        </div>
      );
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
    accessorKey: "total_responses",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <SortableHeader
          isSortedValue={isSortedValue}
          toggleSorting={column.toggleSorting}
        >
          Responses
        </SortableHeader>
      );
    },
    cell: ({ row }) => {
      const totalResponses: number = row.getValue("total_responses");

      return <div className="text-sm">{totalResponses}</div>;
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
          Date Modified
        </SortableHeader>
      );
    },
    cell: ({ row }) => {
      const dateVal: string = row.getValue("updated_at");
      const formattedDate = format(dateVal, "dd/MM/yyyy");

      return <div className="font-medium text-sm">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="text-sm">
          <CollectorActions collector={row.original} />
        </div>
      );
    },
  },
];
