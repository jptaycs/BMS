import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/ui/datatable";
import Filter from "@/components/ui/filter";
import Searchbar from "@/components/ui/searchbar";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Trash } from "lucide-react";

const filters = [
  "All Events",
  "Alphabetical",
  "Date",
  "Venue",
]

type Event = {
  name: string,
  status: "Upcoming" | "Finished" | "Ongoing" | "Cancelled",
  date: string,
  venue: string
}

const columns: ColumnDef<Event>[] = [
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
    header: "Name",
    accessorKey: "name"
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status
      let color: string;
      switch (status) {
        case "Upcoming": {
          color = "#00BD29"
          break;
        }
        case "Finished": {
          color = "#000000"
          break;
        }
        case "Ongoing": {
          color = "#FFB30F"
          break;
        }
        case "Cancelled": {
          color = "#BD0000"
          break;
        }
      }
      return (
        <div style={{ color: color }}>{status}</div>
      )
    }
  },
  {
    header: "Date",
    accessorKey: "date"
  },
  {
    header: "Venue",
    accessorKey: "venue"
  },
]

const data: Event[] = [
  {
    name: "Assembly",
    status: "Upcoming",
    date: "June 29, 2025 - 3:30PM Monday",
    venue: "Barangay Hall"
  },
  {
    name: "Assembly",
    status: "Finished",
    date: "June 29, 2025 - 3:30PM Monday",
    venue: "Barangay Hall"
  },
  {
    name: "Assembly",
    status: "Ongoing",
    date: "June 29, 2025 - 3:30PM Monday",
    venue: "Barangay Hall"
  },
  {
    name: "Assembly",
    status: "Cancelled",
    date: "June 29, 2025 - 3:30PM Monday",
    venue: "Barangay Hall"
  }
]

export default function EventManager() {
  return (
    <>
      <div className="flex gap-5 w-full items-center justify-center">
        <Searchbar placeholder="Search event" classname="flex flex-5" />
        <Filter filters={filters} initial="All Events" classname="flex-1" />
        <Button variant="destructive" size="lg" >
          <Trash />
          Delete Selected
        </Button>
        <Button size="lg" >
          <Plus />
          Add Event
        </Button>
      </div >
      <DataTable<Event> data={data} columns={[...columns,
      {
        id: "action",
        header: "",
        cell: () => (
          <div>
            <Button>View More</Button>
          </div>
        )
      }]} />
    </>
  )
}
