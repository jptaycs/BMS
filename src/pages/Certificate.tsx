import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/ui/datatable";
import Filter from "@/components/ui/filter";
import Searchbar from "@/components/ui/searchbar";
import IssueCertificateModal from "@/features/certificate/issueCertificateModal";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import searchCertificate from "@/service/searchCertificate";

const filters = [
  "All Certificates",
  "OR ASC",
  "OR DESC",
  "Date ASC",
  "Date DESC",
  "Active",
  "Expired",
];

// Certificate type definition
type Certificate = {
  name: string;
  type: string;
  or: string;
  date: Date;
  zone: string;
};

// Certificate table columns
const columns: ColumnDef<Certificate>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
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
    header: "Issued To",
    accessorKey: "name",
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "OR#",
    accessorKey: "or",
  },
  {
    header: "Issued On",
    accessorKey: "date",
    cell: ({ row }) => <div>{format(row.original.date, "MMMM do, yyyy")}</div>,
  },
  {
    header: "Address",
    accessorKey: "zone",
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const oneYearLater = new Date(row.original.date);
      oneYearLater.setFullYear(row.original.date.getFullYear() + 1);
      const status = new Date() > oneYearLater ? "Expired" : "Active";
      return <p>{status}</p>;
    },
  },
];

// Static data for certificates
const date: Certificate[] = [
  {
    name: "John Cena",
    type: "Barangay Certificate",
    or: "0932",
    date: new Date("June 2, 2025"),
    zone: "Zone 3",
  },
  {
    name: "Jane Doe",
    type: "Barangay Clearance",
    or: "1045",
    date: new Date("July 8, 2024"),
    zone: "Zone 1",
  },
  {
    name: "Carlos Rivera",
    type: "Residency Certificate",
    or: "0871",
    date: new Date("May 10, 2023"),
    zone: "Zone 2",
  },
  {
    name: "Maria Santos",
    type: "Barangay Certificate",
    or: "0555",
    date: new Date("August 15, 2022"),
    zone: "Zone 3",
  },
];

// Main component
export default function Certificate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    const sortValue = searchParams.get("sort") ?? "All Certificates";

    let sorted = [...date];

    // OR sorting
    if (sortValue === "OR ASC") {
      sorted.sort((a, b) => a.or.localeCompare(b.or));
    } else if (sortValue === "OR DESC") {
      sorted.sort((a, b) => b.or.localeCompare(a.or));
    }

    // Date sorting
    else if (sortValue === "Date ASC") {
      sorted.sort((a, b) => a.date.getTime() - b.date.getTime());
    } else if (sortValue === "Date DESC") {
      sorted.sort((a, b) => b.date.getTime() - a.date.getTime());
    }

    // Status filtering
    else if (sortValue === "Active") {
      sorted = sorted.filter((cert) => {
        const oneYearLater = new Date(cert.date);
        oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
        return new Date() <= oneYearLater;
      });
    } else if (sortValue === "Expired") {
      sorted = sorted.filter((cert) => {
        const oneYearLater = new Date(cert.date);
        oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
        return new Date() > oneYearLater;
      });
    }

    // Apply search if needed
    if (searchQuery.trim()) {
      return searchCertificate(searchQuery, sorted);
    }

    return sorted;
  }, [searchParams, searchQuery]);

  const handleSortChange = (sortValue: string) => {
    searchParams.set("sort", sortValue);
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="flex gap-5 w-full items-center justify-center mb-4">
        <Searchbar
          onChange={(value) => setSearchQuery(value)}
          placeholder="Search by Name, Type, or OR#"
          classname="flex flex-5"
        />
        <Filter
          filters={filters}
          onChange={handleSortChange}
          initial="All Certificates"
          classname="flex-1"
        />

        <Button variant="destructive" size="lg">
          <Trash />
          Delete Selected
        </Button>
        <IssueCertificateModal />
      </div>
      <DataTable<Certificate>
        columns={[
          ...columns,
          {
            id: "view",
            header: "",
            cell: () => <Button>View more</Button>,
          },
        ]}
        data={filteredData}
      />
    </>
  );
}
