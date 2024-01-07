"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRef } from "react";
import { notUndefined, useVirtualizer } from "@tanstack/react-virtual";
import { ScrollArea } from "./scroll-area";

interface CollectorsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: CollectorsTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 5,
  });

  const items = virtualizer.getVirtualItems();
  const [before, after] =
    items.length > 0
      ? [
          notUndefined(items[0]).start - virtualizer.options.scrollMargin,
          virtualizer.getTotalSize() -
            notUndefined(items[items.length - 1]).end,
        ]
      : [0, 0];

  return (
    <div
      ref={parentRef}
      className="max-h-96 overflow-auto"
      style={{ overflowAnchor: "none" }}
    >
      <Table className="bg-white">
        <col style={{ width: "80%" }} />

        <col style={{ width: "200px" }} />

        <TableHeader className="bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="uppercase sticky top-0 z-10 bg-white text-black text-sm h-8"
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
        <TableBody>
          {before > 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} style={{ height: before }} />
            </TableRow>
          )}
          {items.map((virtualRow, index) => {
            const row = rows[virtualRow.index];

            return (
              <TableRow
                key={virtualRow.key}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      className={`text-gray-500 text-sm
                      h-4 py-1.5 px-4
                      `}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          {after > 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} style={{ height: after }} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// {rows.length ? (
// : (

//   <TableRow>
//     <TableCell
//       colSpan={columns.length}
//       className="h-24 text-center"
//     >
//       No results.
//     </TableCell>
//   </TableRow>
// )

// table.getRowModel().rows.map((row) => (
//   <TableRow
//     key={row.id}
//     data-state={row.getIsSelected() && "selected"}
//   >
//     {row.getVisibleCells().map((cell) => (
//       <TableCell
//         className="text-gray-500 text-sm h-4  py-1.5 px-4"
//         key={cell.id}
//       >
//         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//       </TableCell>
//     ))}
//   </TableRow>
// ))
