import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/ui/datatable";
import Filter from "@/components/ui/filter";
import Searchbar from "@/components/ui/searchbar";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Trash } from "lucide-react";

type Certificate = {
  no: string
  type: string,
  issued: string,
  price: number,
  date: Date,
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
    header: "Cert No.",
    accessorKey: "no"
  },
  {
    header: "Type",
    accessorKey: "type"
  },
  {
    header: "Issued To",
    accessorKey: "issued"
  },
  {
    header: "Price",
    accessorKey: "price"
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
]

const date: Certificate[] = [
  {
    no: "21214412",
    type: "Brgy Clearance",
    issued: "Jerome Tayco",
    price: 200,
    date: new Date("June 2, 2025"),
  },
  {
    no: "21214412",
    type: "Brgy Clearance",
    issued: "Jerome Tayco",
    price: 200,
    date: new Date("June 2, 2025"),
  },
  {
    no: "21214412",
    type: "Brgy Clearance",
    issued: "Jerome Tayco",
    price: 200,
    date: new Date("June 2, 2025"),
  },
  {
    no: "21214412",
    type: "Brgy Clearance",
    issued: "Jerome Tayco",
    price: 200,
    date: new Date("June 2, 2025"),
  },
  {
    no: "21214412",
    type: "Brgy Clearance",
    issued: "Jerome Tayco",
    price: 200,
    date: new Date("June 2, 2025"),
  },
  {
    no: "21214412",
    type: "Brgy Clearance",
    issued: "Jerome Tayco",
    price: 200,
    date: new Date("June 2, 2025"),
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
      </div >
      <DataTable<Certificate> columns={[...columns, {
        id: "view",
        header: "",
      }]}
        data={date}
      />
    </>
  )
}
