import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import SurveyActions from "./survey-actions";
import Link from "next/link";
import SortableHeader from "@/components/data-table/sortable-header";
import { Survey } from "@/types/survey";

export const columns: ColumnDef<Survey>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <SortableHeader
          isSortedValue={isSortedValue}
          toggleSorting={column.toggleSorting}
        >
          Title
        </SortableHeader>
      );
    },

    cell: ({ row }) => {
      const title: string = row.getValue("title");
      return (
        <Link
          className="hover:underline text-indigo-500 font-medium"
          href={`/survey/${row.original.id}/build`}
          title={title}
        >
          {title}
        </Link>
      );
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <SortableHeader
          isSortedValue={isSortedValue}
          toggleSorting={column.toggleSorting}
        >
          Created
        </SortableHeader>
      );
    },

    cell: ({ row }) => {
      const createdVal: string = row.getValue("created_at");
      const formattedDate = format(new Date(createdVal), "yyyy-MM-dd");

      return <div>{formattedDate}</div>;
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
      const formattedDate = format(new Date(lastModifiedVal), "yyyy-MM-dd");

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "responses_count",
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
      const responseCount: number = row.getValue("responses_count");
      return <div className="text-indigo-500 font-medium">{responseCount}</div>;
    },
  },
  {
    accessorKey: "question_count",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <SortableHeader
          isSortedValue={isSortedValue}
          toggleSorting={column.toggleSorting}
        >
          Questions
        </SortableHeader>
      );
    },

    cell: ({ row }) => {
      const questionCount: number = row.getValue("question_count");
      return <div className="text-indigo-500 font-medium">{questionCount}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <SurveyActions survey={row.original} />;
    },
  },
];
