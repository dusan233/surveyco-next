import React from "react";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { RowModel, flexRender } from "@tanstack/react-table";

interface DataTableBodyProps<TData> {
  getRowModel: () => RowModel<TData>;
  columnsLength: number;
  noDataMsg?: string;
}

const DataTableBody = <TData,>({
  getRowModel,
  columnsLength,
  noDataMsg,
}: DataTableBodyProps<TData>) => {
  return (
    <TableBody>
      {getRowModel().rows?.length ? (
        getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell, index) => (
              <TableCell
                className={`px-4 bg-white py-2 h-10 truncate max-w-[200px] ... ${
                  index === 0 && "sticky left-0 top-0 max-w-[100px]"
                }`}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columnsLength} className="h-24 text-center">
            {noDataMsg ?? "No results."}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default DataTableBody;
