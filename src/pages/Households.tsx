import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/ui/datatable";
import Filter from "@/components/ui/filter";
import Searchbar from "@/components/ui/searchbar";
import AddHouseholdModal from "@/features/households/addHouseholdModal";
import DeleteHouseholdModal from "@/features/households/deleteHouseholdModal";
import ViewHouseholdModal from "@/features/households/viewHouseholdModal";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Trash } from "lucide-react";

const filters = [
  "All Households",
  "Numerical",
  "Renter",
  "Owner",
]

type Household = {
  householdNumber: string,
  type: string,
  members: number,
  head: string,
  zone: string,
  date: Date,
  status: "Moved Out" | "Active",
}

const columns: ColumnDef<Household>[] = [
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
    header: "House Number",
    accessorKey: "householdNumber",
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Family Members",
    accessorKey: "members",
    cell: ({ row }) => (
      <div className="flex ml-10">{row.original.members}</div>
    )
  },
  {
    header: "Head of Household",
    accessorKey: "head"
  },
  {
    header: "Zone",
    accessorKey: "zone"
  },
  {
    header: "Date of Recidency",
    accessorKey: "date",
    cell: ({ row }) => {
      return (
        <div>{format(row.original.date, "MMMM do, yyyy")}</div>
      )
    }
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      let color: string;
      switch (status) {
        case "Moved Out": {
          color = "#BD0000";
          break;
        }
        case "Active": {
          color = "#00BD29";
          break;
        }
        default: {
          color = "#000000";
        }
      }
      return (
        <div style={{ color: color }}>{status}</div>
      );
    }
  }
]

const data: Household[] = [
  {
    householdNumber: "1232",
    type: "Renter",
    members: 15,
    head: "Karl Abechuela",
    zone: "Zone 1",
    date: new Date("June 29, 2023"),
    status: "Active",
  },
  {
    householdNumber: "1232",
    type: "Renter",
    members: 5,
    head: "Karl Abechuela",
    zone: "Zone 1",
    date: new Date("June 29, 2023"),
    status: "Active",
  },
  {
    householdNumber: "1232",
    type: "Renter",
    members: 5,
    head: "Karl Abechuela",
    zone: "Zone 1",
    date: new Date("June 29, 2023"),
    status: "Active",
  },
  {
    householdNumber: "1232",
    type: "Renter",
    members: 5,
    head: "Karl Abechuela",
    zone: "Zone 1",
    date: new Date("June 29, 2023"),
    status: "Moved Out",
  },
]

export default function Households() {
  return (
    <>
      <div className="flex gap-5 w-full items-center justify-center">
        <Searchbar placeholder="Search event" classname="flex flex-5" />
        <Filter filters={filters} initial="All Events" classname="flex-1" />
        <Button variant="destructive" size="lg" >
          <Trash />
          Delete Selected
        </Button>
        <AddHouseholdModal />
      </div >
      <DataTable<Household> data={data} columns={[...columns,
      {
        id: "view",
        header: "",
        cell: ({ row }) => {
          const status = row.original.status
          return (
            < div className="flex gap-3 ">
              <ViewHouseholdModal {...row.original} />
              {status == "Moved Out" && <DeleteHouseholdModal {...row.original} />}
            </div >
          )
        }
      }
      ]} />
    </>
  )
}
