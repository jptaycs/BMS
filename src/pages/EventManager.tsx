import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/ui/datatable";
import Filter from "@/components/ui/filter";
import Searchbar from "@/components/ui/searchbar";
import AddEventModal from "@/features/event-manager/addEventModal";
import CancelEventModal from "@/features/event-manager/cancelEventModal";
import ViewEventModal from "@/features/event-manager/viewEventModal";
import { sort } from "@/service/eventSort";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const filters = [
  "All Events",
  "Date ASC",
  "Date DESC",
  "Venue",
  "Upcoming",
  "Finished",
  "Cancelled",
]

type Event = {
  name: string,
  type: string,
  status: "Upcoming" | "Finished" | "Ongoing" | "Cancelled",
  date: Date,
  venue: string,
  atendee: string,
  notes: string
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
    ),
  },
  {
    header: "Name",
    accessorKey: "name"
  },
  {
    header: "Type",
    accessorKey: "type"
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
    accessorKey: "date",
    cell: ({ row }) => {
      return (
        <div>{format(row.original.date, "MMMM do, yyyy")}</div>
      )
    }

  },
  {
    header: "Venue",
    accessorKey: "venue"
  },
]

const data: Event[] = [
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 12, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 10, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Meeting for event",
    type: "Assembly",
    status: "Upcoming",
    date: new Date("June 3, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Livelihood Progra",
    type: "Seminar",
    status: "Finished",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Livelihood Progra",
    type: "Seminar",
    status: "Cancelled",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Livelihood Progra",
    type: "Seminar",
    status: "Ongoing",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
  {
    name: "Livelihood Progra",
    type: "Seminar",
    status: "Finished",
    date: new Date("June 2, 2025"),
    venue: "Barangay Hall",
    atendee: "All Officials",
    notes: "Sample Notes",
  },
]

export default function EventManager() {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSortChange = (sortValue: string) => {
    searchParams.set("sort", sortValue)
    setSearchParams(searchParams)
  }

  const filteredData = useMemo(() => {
    return sort(data, searchParams.get("sort") ?? "All Events")
  }, [searchParams, data])

  return (
    <>
      <div className="flex gap-5 w-full items-center justify-center">
        <Searchbar placeholder="Search Event" classname="flex flex-5" />
        <Filter onChange={handleSortChange} filters={filters} initial="All Events" classname="flex-1" />
        <Button variant="destructive" size="lg" >
          <Trash />
          Delete Selected
        </Button>
        <AddEventModal />
      </div >
      <DataTable<Event> maxHeight="max-h-[29rem]" data={filteredData} columns={[...columns,
      {
        id: "view",
        header: "",
        cell: ({ row }) => {
          const status = row.original.status
          return (
            < div className="flex gap-3 ">
              <ViewEventModal {...row.original} />
              {status !== "Cancelled" && status !== "Finished" && <CancelEventModal {...row.original} />}
            </div >
          )
        }
      }
      ]} />
    </>
  )
}
