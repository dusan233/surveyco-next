import { QuizResponseData } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react";
import SurveyActions from "./survey-actions";
import Link from "next/link";

export const columns: ColumnDef<QuizResponseData>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <button
          className="w-full flex gap-0.5 items-center"
          onClick={() => column.toggleSorting(isSortedValue === "asc")}
        >
          Title
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
      const title: string = row.getValue("title");
      return (
        <div
          className="text-indigo-500 font-medium flex items-center truncate ..."
          title={title}
        >
          <Link
            className="hover:underline"
            href={`/survey/${row.original.id}/build`}
          >
            {title}
          </Link>
        </div>
      );
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <button
          className="w-full flex gap-0.5 items-center"
          onClick={() => column.toggleSorting(isSortedValue === "asc")}
        >
          Created
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
      const formattedDate = format(new Date(lastModifiedVal), "yyyy-MM-dd");

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "responses_count",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <button
          className="w-full flex gap-0.5 items-center"
          onClick={() => column.toggleSorting(isSortedValue === "asc")}
        >
          Responses
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
      const responseCount: number = row.getValue("responses_count");
      return (
        <div className="text-indigo-500 font-medium flex items-center truncate ...">
          {responseCount}
        </div>
      );
    },
  },
  {
    accessorKey: "question_count",
    header: ({ column }) => {
      const isSortedValue = column.getIsSorted();
      return (
        <button
          className="w-full flex gap-0.5 items-center"
          onClick={() => column.toggleSorting(isSortedValue === "asc")}
        >
          Questions
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
      const questionCount: number = row.getValue("question_count");
      return (
        <div className="text-indigo-500 font-medium flex items-center">
          {questionCount}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <SurveyActions survey={row.original} />;
    },
  },
];
