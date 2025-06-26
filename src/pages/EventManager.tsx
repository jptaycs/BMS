import { Button } from "@/components/ui/button";
import Searchbar from "@/components/ui/searchbar";
import { Plus, Trash } from "lucide-react";

export default function EventManager() {
  return (
    <>
      <div className="flex gap-5 w-full items-center justify-center">
        <Searchbar placeholder="Search" classname="flex-5" />
        <Searchbar placeholder="Search" classname="flex-2" />
        <Button variant="destructive" size="lg" className="font-bold flex-1">
          <Trash />
          Delete Selected
        </Button>
        <Button size="lg" className="font-bold ">
          <Plus />
          Add Event
        </Button>
      </div>
    </>
  )
}
