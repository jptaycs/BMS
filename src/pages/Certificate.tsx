import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/ui/datatable";
import Filter from "@/components/ui/filter";
import Searchbar from "@/components/ui/searchbar";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Plus, Trash } from "lucide-react";

type Certificate = {
  name: string
  type: string,
  or: string,
  date: Date,
  zone: string,
  status: "Active" | "Expired"
}

const columns: ColumnDef<Certificate>[] = [
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
    )
  },
  {
    header: "Issued To",
    accessorKey: "name"
  },
  {
    header: "Type",
    accessorKey: "type"
  },
  {
    header: "OR#",
    accessorKey: "or"
  },
  {
    header: "Issued On",
    accessorKey: "date",
    cell: ({ row }) => {
      return (
        <div>{format(row.original.date, "MMMM do, yyyy")}</div>
      )
    }
  },
  {
    header: "Address",
    accessorKey: "zone"
  },
]

const date: Certificate[] = [
  {
    name: "John Cena",
    type: "Barangay Certificate",
    or: "0932",
    date: new Date("June 2, 2025"),
    zone: "Zone 3",
    status: "Expired",
  },
  {
    name: "John Cena",
    type: "Barangay Certificate",
    or: "0932",
    date: new Date("June 2, 2025"),
    zone: "Zone 3",
    status: "Expired",
  },
  {
    name: "John Cena",
    type: "Barangay Certificate",
    or: "0932",
    date: new Date("June 2, 2025"),
    zone: "Zone 3",
    status: "Expired",
  },
  {
    name: "John Cena",
    type: "Barangay Certificate",
    or: "0932",
    date: new Date("June 2, 2025"),
    zone: "Zone 3",
    status: "Expired",
  },
  {
    name: "John Cena",
    type: "Barangay Certificate",
    or: "0932",
    date: new Date("June 2, 2025"),
    zone: "Zone 3",
    status: "Expired",
  },
]

export default function Certificate() {
  return (
    <>
      <div className="flex gap-5 w-full items-center justify-center">
        <Searchbar placeholder="Search Certificate" classname="flex flex-5" />
        <Filter filters={[]} initial="All Certificates" classname="flex-1" />
        <Button variant="destructive" size="lg" >
          <Trash />
          Delete Selected
        </Button>
        <Button size="lg" >
          <Plus />
          Issue Certificate
        </Button>
      </div >
      <DataTable<Certificate> columns={[...columns, {
        id: "view",
        header: "",
        cell: () => (
          <>
            <Button>View more</Button>
          </>
        )
      }]}
        data={date}
      />
    </>
  )
}
