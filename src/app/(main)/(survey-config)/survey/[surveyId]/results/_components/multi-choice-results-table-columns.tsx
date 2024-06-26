import { ColumnDef } from "@tanstack/react-table";
import DOMPurify from "isomorphic-dompurify";

export const columns: ColumnDef<{
  description: string;
  percenteges: number;
  answeredCount: number;
  id: string;
}>[] = [
  {
    accessorKey: "description",
    header: "Answer",
    cell: ({ row }) => {
      const choiceDescription: string = row.getValue("description");
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(choiceDescription),
          }}
          className="font-medium"
        />
      );
    },
  },

  {
    accessorKey: "updated_at",
    header: "Responses",
    cell: ({ row }) => {
      const choiceResult = row.original;

      return (
        <div className="font-medium text-sm flex gap-4">
          <span>{choiceResult.answeredCount}</span>
          <span className="font-bold">{choiceResult.percenteges}%</span>
        </div>
      );
    },
    size: 200,
  },
];
