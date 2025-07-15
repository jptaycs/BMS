import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from "@tanstack/react-table"
import { Table, TableCell, TableHead, TableRow } from "./table"
import { TableVirtuoso } from "react-virtuoso";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const TableRowComponent = <TData,>(rows: Row<TData>[]) =>
  function getTableRow(props: HTMLAttributes<HTMLTableRowElement>) {
    const index = props["data-index"]
    const row = rows[index]
    if (!row) return null
    return (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
        {...props}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    )
  }

type TableProps<T> = {
  columns: ColumnDef<T>[]
  data: T[]
  height: string
  classname?: string
}
export default function DataTable<T>({ columns, data, height, classname }: TableProps<T>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const { rows } = table.getRowModel()
  return (
    <div className={cn("rounded-md", classname)}>
      <TableVirtuoso
        style={{ height }}
        totalCount={rows.length}
        components={{
          Table: Table,
          TableRow: TableRowComponent(rows)
        }}
        fixedHeaderContent={() =>
          table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="z-20 bg-background" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: header.getSize()
                    }}
                    className="text-black bg-transparent py-4"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className="flex items-center"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))
        }
      />
    </div>
  )
}

