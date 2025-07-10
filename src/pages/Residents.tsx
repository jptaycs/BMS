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
import { Resident } from "@/types/types";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { sort } from "@/service/residentSort";

const filters = [
  "All Residents",
  "Alphabetical",
  "Moved Out",
  "Active",
  "Dead",
  "Missing",
]


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
          color = "#BD0000";
          break;
        }
        case "Active": {
          color = "#00BD29";
          break;
        }
        case "Dead": {
          color = "#000000";
          break;
        }
        case "Missing": {
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
    status: "Dead",
  },
  {
    fullName: "Karl Abechuela",
    civilStatus: "Single",
    birthday: new Date("June 29, 2003"),
    gender: "Male",
    zone: "Zone",
    status: "Moved Out",
  },
  {
    fullName: "Karl Abechuela",
    civilStatus: "Single",
    birthday: new Date("June 29, 2003"),
    gender: "Male",
    zone: "Zone",
    status: "Missing",
  },
]

export default function Residents() {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSortChange = (sortValue: string) => {
    searchParams.set("sort", sortValue)
    setSearchParams(searchParams)
  }

  const filteredData = useMemo(() => {
    return sort(data, searchParams.get("sort") ?? "All Residents")
  }, [searchParams, data])
  return (
    <>
      <div className="flex gap-5 w-full items-center justify-center">
        <Searchbar placeholder="Search Resident" classname="flex flex-5" />
        <Filter onChange={handleSortChange} filters={filters} initial="All Residents" classname="flex-1" />
        <Button variant="destructive" size="lg" >
          <Trash />
          Delete Selected
        </Button>
        <AddResidentModal />
      </div >
      <DataTable<Resident> maxHeight="max-h-[29rem]" data={filteredData} columns={[...columns,
      {
        id: "view",
        header: "",
        cell: ({ row }) => {
          const status = row.original.status
          return (
            < div className="flex gap-3 ">
              <ViewResidentModal {...row.original} />
              {status !== "Active" && <DeleteResidentModal {...row.original} />}
            </div >
          )
        }
      }
      ]} />
    </>
  )
}
