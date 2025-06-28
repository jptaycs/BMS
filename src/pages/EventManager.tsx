import { Button } from "@/components/ui/button";
import Filter from "@/components/ui/filter";
import Searchbar from "@/components/ui/searchbar";
import { Plus, Trash } from "lucide-react";

const filters = [
  "All Events",
  "Date",
  "Venue",
]

export default function EventManager() {
  return (
    <>
      <div className="flex gap-5 w-full items-center justify-center">
        <Searchbar placeholder="Search event" classname="flex flex-5" />
        <Filter filters={filters} initial="All Events" />
        <Button variant="destructive" size="lg" >
          <Trash />
          Delete Selected
        </Button>
        <Button size="lg" >
          <Plus />
          Add Event
        </Button>
      </div >
    </>
  )
}
