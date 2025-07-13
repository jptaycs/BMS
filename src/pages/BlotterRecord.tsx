import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/ui/datatable";
import Filter from "@/components/ui/filter";
import Searchbar from "@/components/ui/searchbar";
import AddBlotterModal from "@/features/blotter/addBlotterModal";
import DeleteBlotterModal from "@/features/blotter/deleteBlotterModal";
import ViewBlotterModal from "@/features/blotter/viewBlotterModal";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Trash } from "lucide-react";

const filters = [
  "All Blotter Records",
  "Alphabetical",
  "ID",
  "Active",
  "On Going",
  "Closed",
  "Transferred to Police",
  "Date Incident",
]

type Blotter = {
  id: number,
  type: string,
  reportedBy: string,
  involved: string,
  date: Date,
  location: string,
  zone: string,
  status: "On Going" | "Active" | "Transferred to Police" | "Closed",
  // narrative: string,
  // action: string,
  // witnesses: string,
  // evidence: string,
  // resolution: string,
  // hearingDate: Date,
}

const columns: ColumnDef<Blotter>[] = [
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
    header: "Blotter ID",
    accessorKey: "id"
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Reported By",
    accessorKey: "reportedBy",
  },
  {
    header: "involved",
    accessorKey: "type",
  },
  {
    header: "Date Incident",
    accessorKey: "date",
    cell: ({ row }) => {
      return (
        <div>{format(row.original.date, "MMMM do, yyyy")}</div>
      )
    }
  },
  {
    header: "Location",
    accessorKey: "location"
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
        case "On Going": {
          color = "#BD0000";
          break;
        }
        case "Active": {
          color = "#00BD29";
          break;
        }
        case "Closed": {
          color = "#000000";
          break;
        }
        case "Transferred to Police": {
          color = "#FFB30F";
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

const data: Blotter[] = [
  {
    id: 323,
    type: "Theft",
    reportedBy: "John Abechuela",
    involved: "Lincoln",
    date: new Date("June 29, 2003"),
    location: "Brgy. Tambo",
    zone: "Zone 4",
    status: "On Going",
  },
  {
    id: 323,
    type: "Theft",
    reportedBy: "Karl Abechuela",
    involved: "Lincoln",
    date: new Date("June 29, 2003"),
    location: "Brgy. Tambo",
    zone: "Zone 4",
    status: "On Going",
  },
  {
    id: 323,
    type: "Theft",
    reportedBy: "Karl Abechuela",
    involved: "Lincoln",
    date: new Date("June 29, 2003"),
    location: "Brgy. Tambo",
    zone: "Zone 4",
    status: "On Going",
  },
]

export default function Blotters() {
  return (
    <>
      <div className="flex gap-5 w-full items-center justify-center">
        <Searchbar placeholder="Search Blotter" classname="flex flex-5" onChange={function (searchTerm: string): void {
          throw new Error("Function not implemented.");
        } } />
        <Filter filters={filters} initial="All Blotter" classname="flex-1" onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        } } />
        <Button variant="destructive" size="lg" >
          <Trash />
          Delete Selected
        </Button>
        <AddBlotterModal />
      </div >
      <DataTable<Blotter> data={data} columns={[...columns,
      {
        id: "view",
        header: "",
        cell: ({ row }) => {
          const status = row.original.status
          return (
            < div className="flex gap-3 ">
              <ViewBlotterModal {...row.original} />
              {status !== "Active" && <DeleteBlotterModal {...row.original} />}
            </div >
          )
        }
      }
      ]} />
    </>
  )
}
