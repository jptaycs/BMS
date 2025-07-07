import { Button } from "@/components/ui/button";
import Filter from "@/components/ui/filter";
import Searchbar from "@/components/ui/searchbar";
import { Trash } from "lucide-react";

export default function Certificate() {
  return (
    <div className="flex gap-5 w-full items-center justify-center">
      <Searchbar placeholder="Search Certificate" classname="flex flex-5" />
      <Filter filters={[]} initial="All Certificates" classname="flex-1" />
      <Button variant="destructive" size="lg" >
        <Trash />
        Delete Selected
      </Button>
    </div >
  )
}
