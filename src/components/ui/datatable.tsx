import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from "@tanstack/react-table"
import { Table, TableCell, TableHead, TableRow } from "./table"
import { TableVirtuoso } from "react-virtuoso";
import { HTMLAttributes } from "react";

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
}
export default function DataTable<T>({ columns, data, height }: TableProps<T>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const { rows } = table.getRowModel()
  return (
    <div className="rounded-md my-10">
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

/*<div className={cn("w-full my-10 text-black", classname)}>
  <Table>
    <TableHeader className="sticky top-0 bg-background z-10" >
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}  >
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id} className="text-black font-redhat font-bold py-5">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
    <TableBody>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="py-3">
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center"
          >
            No results
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</div>*/
