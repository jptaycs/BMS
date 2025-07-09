import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/ui/datatable";
import Filter from "@/components/ui/filter";
import Searchbar from "@/components/ui/searchbar";
import AddExpenseModal from "@/features/expense/addExpenseModal";
import DeleteExpenseModal from "@/features/expense/deleteExpenseModal";
import ViewExpenseModal from "@/features/expense/viewExpenseModal";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Trash } from "lucide-react";

const filters = [
  "All Expense",
  "Numerical",
  "Date Issued",
  "This Month",
  "This Week",
]

type Expense = {
  type: string,
  amount: number,
  or: number,
  paidFrom: string,
  paidBy: string,
  date: Date,
}

const columns: ColumnDef<Expense>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? "indeterminate" : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="flex items-center justify-center"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="flex items-center justify-center"
      />
    ),
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Paid From",
    accessorKey: "paidFrom",
  },
  {
    header: "Paid By",
    accessorKey: "paidBy",
  },
  {
    header: "Date Issued",
    accessorKey: "date",
    cell: ({ row }) => {
      return (
        <div>{format(row.original.date, "MMMM do, yyyy")}</div>
      )
    }
  },
]

const data: Expense[] = [
  {
    type: "Business Permit",
    amount: 150,
    or: 123456,
    paidFrom: "Treasurer Office",
    paidBy: "John Doe",
    date: new Date("June 29, 2023"),
  },
  {
    type: "Business Permit",
    amount: 150,
    or: 123456,
    paidFrom: "Treasurer Office",
    paidBy: "John Doe",
    date: new Date("June 29, 2023"),
  },
  {
    type: "Business Permit",
    amount: 150,
    or: 123456,
    paidFrom: "Treasurer Office",
    paidBy: "John Doe",
    date: new Date("June 29, 2023"),
  },
  {
    type: "Business Permit",
    amount: 150,
    or: 123456,
    paidFrom: "Treasurer Office",
    paidBy: "John Doe",
    date: new Date("June 29, 2023"),
  },

]

export default function Expense() {
  return (
    <>
      <div className="flex gap-5 w-full items-center justify-center">
        <Searchbar placeholder="Search Income" classname="flex flex-5" />
        <Filter filters={filters} initial="All Income" classname="flex-1" />
        <Button variant="destructive" size="lg" >
          <Trash />
          Delete Selected
        </Button>
        <AddExpenseModal />
      </div >
      <DataTable<Expense> maxHeight="max-h-[29rem]" data={data} columns={[...columns,
      {
        id: "view",
        header: "",
        cell: ({ row }) => {
          return (
            < div className="flex gap-3 ">
              <ViewExpenseModal {...row.original} />
              {<DeleteExpenseModal {...row.original} />}
            </div >
          )
        }
      }
      ]} />
    </>
  )
}
