"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import CollectorActions from "./collector-actions";
import CopyCollectorWebLink from "./copy-collector-web-link";
import SortableHeader from "@/components/data-table/sortable-header";
import { Collector, CollectorType } from "@/types/collector";

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
      const createdDate = new Date(dateVal);

      const formattedDate = format(createdDate, "dd/MM/yyyy");
      return (
        <div className="font-medium text-sm space-y-1">
          <Link
            href={`/survey/${row.original.surveyId}/collector/${row.original.id}`}
            className="text-blue-700 hover:underline font-bold"
          >
            {row.original.name}
          </Link>

          <CopyCollectorWebLink collectorId={row.original.id} />
          <div>
            Created{" "}
            <time dateTime={createdDate.toISOString()}>{formattedDate}</time>
          </div>
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
      const classNames =
        statusVal === "open" ? "bg-secondary text-primary" : "bg-primary";

      return (
        <div className="font-medium text-white flex items-center">
          <div className={`py-0.5 px-2 uppercase rounded-sm ${classNames}`}>
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
      const updatedAt = new Date(dateVal);
      const formattedDate = format(updatedAt, "dd/MM/yyyy");

      return (
        <div className="font-medium text-sm">
          <time dateTime={updatedAt.toISOString()}>{formattedDate}</time>
        </div>
      );
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
