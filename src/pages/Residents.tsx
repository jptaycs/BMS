import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/ui/datatable";
import Filter from "@/components/ui/filter";
import Searchbar from "@/components/ui/searchbar";
import AddResidentModal from "@/features/residents/addResidentModal";
import DeleteResidentModal from "@/features/residents/deleteResidentModal";
import ViewResidentModal from "@/features/residents/viewResidentModal";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Trash } from "lucide-react";

const filters = [
  "All Residents",
  "Alphabetical",
  "Civil Status",
  "Age",
  "Gender",
  "Zone",
  "Moved Out",
  "Active",
]

type Resident = {
  fullName: string,
  civilStatus: string,
  status: "Moved Out" | "Active" | "Dead" | "Missing",
  birthday: Date,
  gender: string,
  zone: string,
}

const columns: ColumnDef<Resident>[] = [
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
    header: "Full Name",
    accessorKey: "fullName"
  },
  {
    header: "Civil Status",
    accessorKey: "civilStatus",
  },
    {
    header: "Birthday",
    accessorKey: "birthdate",
    cell: ({ row }) => {
      return (
        <div>{format(row.original.birthday, "MMMM do, yyyy")}</div>
      )
    }
  },
    {
    header: "Gender",
    accessorKey: "gender"
  },
      {
    header: "Zone",
    accessorKey: "zone"
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      let color: string;
      switch (status) {
        case "Moved Out": {
          color = "#00BD29";
          break;
        }
        case "Active": {
          color = "#000000";
          break;
        }
        case "Dead": {
          color = "#FFB30F";
          break;
        }
        case "Missing": {
          color = "#BD0000";
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



const data: Resident[] = [
  {
    fullName: "Karl Abechuela",
    civilStatus: "Single",
    birthday: new Date("June 29, 2003"),
    gender: "Male",
    zone: "Zone",
    status: "Active",
  },
  {
  fullName: "Karl Abechuela",
  civilStatus: "Single",
  birthday: new Date("June 29, 2003"),
  gender: "Male",
  zone: "Zone",
  status: "Active",
},
  {
  fullName: "Karl Abechuela",
  civilStatus: "Single",
  birthday: new Date("June 29, 2003"),
  gender: "Male",
  zone: "Zone",
  status: "Active",
},
]

export default function Residents() {
  return (
    <>
      <div className="flex gap-5 w-full items-center justify-center">
        <Searchbar placeholder="Search event" classname="flex flex-5" />
        <Filter filters={filters} initial="All Events" classname="flex-1" />
        <Button variant="destructive" size="lg" >
          <Trash />
          Delete Selected
        </Button>
        <AddResidentModal />
      </div >
      <DataTable<Resident> data={data} columns={[...columns,
      {
        id: "view",
        header: "",
        cell: ({ row }) => {
          const status = row.original.status
          return (
            < div className="flex gap-3 ">
              <ViewResidentModal {...row.original} />
              {status !== "Dead" && status !== "Moved Out" && <DeleteResidentModal {...row.original} />}
            </div >
          )
        }
      }
      ]} />
    </>
  )
}
