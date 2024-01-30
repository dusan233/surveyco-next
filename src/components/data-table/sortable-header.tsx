import { SortDirection } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { ReactNode } from "react";

type SortableHeaderProps = {
  isSortedValue: false | SortDirection;
  toggleSorting: (
    desc?: boolean | undefined,
    isMulti?: boolean | undefined
  ) => void;
  children: ReactNode;
};

const SortableHeader = ({
  isSortedValue,
  toggleSorting,
  children,
}: SortableHeaderProps) => {
  return (
    <button
      className="w-full h-full inline-flex gap-0.5 items-center"
      onClick={() => toggleSorting(isSortedValue === "asc")}
    >
      <span className="truncate ...">{children}</span>
      {isSortedValue && (
        <span>
          {isSortedValue === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </span>
      )}
    </button>
  );
};

export default SortableHeader;
