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
import { useVirtualizer } from "@tanstack/react-virtual";
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
    overscan: 20,
  });

  return (
    // h-72 overflow-scroll
    <div ref={parentRef} className="h-96 overflow-auto">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <Table className="bg-white">
          <TableHeader className="sticky top-0 bg-white z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="uppercase text-black text-sm h-8"
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
          <TableBody className=" ">
            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const row = rows[virtualRow.index];

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="text-gray-500 text-sm 
                      h-4 py-1.5 px-4
                     
                      "
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
// h-8
// h-4 py-1.5 px-4

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
