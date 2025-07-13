import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Resident } from "@/types/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const data: Resident[] = [
  {
    fullName: "Cydil Abechuela",
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
    fullName: "Sheer Jay Francisco",
    civilStatus: "Single",
    birthday: new Date("June 29, 2003"),
    gender: "Male",
    zone: "Zone",
    status: "Moved Out",
  },
  {
    fullName: "Jerome Tayco",
    civilStatus: "Single",
    birthday: new Date("June 29, 2003"),
    gender: "Male",
    zone: "Zone",
    status: "Missing",
  },
]

type mock = {
  value: string,
  label: string
}

const residents = (): mock[] => {
  return data.map((res) => ({
    value: res.fullName.toLowerCase(),
    label: res.fullName
  }))
}
export default function Fourps() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  return (
    <>
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="hover:bg-gray-100">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full flex justify-between"
            >
              {value
                ? residents().find((res) => res.value === value)?.label
                : "Select a Resident"
              }
              <ChevronsUpDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
            <Command>
              <CommandInput placeholder="Search Resident..." className="h-9" />
              <CommandList className="w-full">
                <CommandEmpty>No Residents Found</CommandEmpty>
                <CommandGroup>
                  {residents().map((res, i) => (
                    <CommandItem
                      className="text-black"
                      key={i}
                      value={res.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      {res.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === res.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div >
    </>
  )
}
