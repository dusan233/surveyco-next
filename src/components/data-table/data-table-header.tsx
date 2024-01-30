import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { HeaderGroup, flexRender } from "@tanstack/react-table";

interface DataTableHeaderProps<TData> {
  getHeaderGroups: () => HeaderGroup<TData>[];
}

const DataTableHeader = <TData,>({
  getHeaderGroups,
}: DataTableHeaderProps<TData>) => {
  return (
    <TableHeader>
      {getHeaderGroups().map((headerGroup) => (
        <TableRow
          className="shadow-sm z-20 bg-white sticky top-0"
          key={headerGroup.id}
        >
          {headerGroup.headers.map((header, index) => {
            return (
              <TableHead
                className={`bg-white ${
                  index === 0 && "sticky left-0 top-0 max-w-[100px]"
                }`}
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default DataTableHeader;
