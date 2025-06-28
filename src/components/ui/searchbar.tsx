import { Search } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

type SearchbarParams = {
  placeholder: string
  classname?: string
}

export default function Searchbar({ placeholder, classname }: SearchbarParams) {
  return <div className={cn("relative", classname)}>
    <Input
      className="min-h-12 border-1 border-black/50 pl-16"
      autoComplete="on"
      placeholder={placeholder}
    />
    <div className="w-2 h-2 absolute inset-y-3 left-6 items-center ">
      <Search />
    </div>
  </div>
}
