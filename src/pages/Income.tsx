<<<<<<< HEAD
export default function Income() {
  return (
    <>This is the Income tab</>
=======
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/ui/datatable";
import Filter from "@/components/ui/filter";
import Searchbar from "@/components/ui/searchbar";
import AddIncomeModal from "@/features/income/addIncomeModal";
import DeleteIncomeModal from "@/features/income/deleteIncomeModal";
import ViewIncomeModal from "@/features/income/viewIncomeModal";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Trash } from "lucide-react";

const filters = [
  "All Income",
  "Numerical",
  "Date Issued",
  "This Month",
  "This Week",
]

type Income = {
  type: string,
  amount: number,
  or: number,
  receivedFrom: string,
  receivedBy: string,
  date: Date,
}

const columns: ColumnDef<Income>[] = [
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
    header: "Received From",
    accessorKey: "receivedFrom",
  },
  {
    header: "Received By",
    accessorKey: "receivedBy",
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

const data: Income[] = [
  {
    type: "Business Permit",
    amount: 150,
    or: 123456,
    receivedFrom: "Treasurer Office",
    receivedBy: "John Doe",
    date: new Date("June 29, 2023"),
  },
    {
    type: "Business Permit",
    amount: 150,
    or: 123456,
    receivedFrom: "Treasurer Office",
    receivedBy: "John Doe",
    date: new Date("June 29, 2023"),
  },
    {
    type: "Business Permit",
    amount: 150,
    or: 123456,
    receivedFrom: "Treasurer Office",
    receivedBy: "John Doe",
    date: new Date("June 29, 2023"),
  },
    {
    type: "Business Permit",
    amount: 150,
    or: 123456,
    receivedFrom: "Treasurer Office",
    receivedBy: "John Doe",
    date: new Date("June 29, 2023"),
  },
  
]

export default function Income() {
  return (
    <>
      <div className="flex gap-5 w-full items-center justify-center">
        <Searchbar placeholder="Search Income" classname="flex flex-5" />
        <Filter filters={filters} initial="All Income" classname="flex-1" />
        <Button variant="destructive" size="lg" >
          <Trash />
          Delete Selected
        </Button>
        <AddIncomeModal />
      </div >
      <DataTable<Income> data={data} columns={[...columns,
      {
        id: "view",
        header: "",
        cell: ({ row }) => {
          return (
            < div className="flex gap-3 ">
              <ViewIncomeModal {...row.original} />
              {<DeleteIncomeModal {...row.original} />}
            </div >
          )
        }
      }
      ]} />
    </>
>>>>>>> origin/main
  )
}
