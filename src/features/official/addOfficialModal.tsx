// AddOfficialModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { officialSchema} from "@/types/formSchema";
import { z } from "zod";

export default function AddOfficialModal({ open, onClose }) {
  const [form, setForm] = useState({
    fullName: "",
    category: "",
    position: "",
    age: "",
    contact: "",
    assignedZone: "",
  });
  const [termStart, setTermStart] = useState<Date>();
  const [termEnd, setTermEnd] = useState<Date>();

  const categories = ["Barangay Officials", "SK Officials", "Tanod Officials"];
  const positions = ["Captain", "Councilor", "Secretary", "Treasurer", "Caretaker", "Chief", "Tanod"];

  const handleSave = () => {
    try {
      const validated = officialSchema.parse({
        fullName: form.fullName,
        category: 0, // convert or lookup as needed
        position: 0, // convert or lookup as needed
        termStart: termStart?.toISOString().split("T")[0] || "",
        termEnd: termEnd?.toISOString().split("T")[0] || "",
        assignedZone: new Date(), // adjust if using string input
      });

      console.log("Validated Data:", validated);
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.errors[0].message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-screen overflow-y-auto text-black">
        <DialogHeader>
          <DialogTitle className="text-black">Add Official</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full text-black placeholder:text-black"
          />

          <Select onValueChange={(val) => setForm({ ...form, category: val })}>
            <SelectTrigger className="w-full text-black">
              <SelectValue placeholder="Select Category" className="text-black" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c, i) => (
                <SelectItem key={c} value={i.toString()} className="text-black">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(val) => setForm({ ...form, position: val })}>
            <SelectTrigger className="w-full text-black">
              <SelectValue placeholder="Select Position" className="text-black" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((p, i) => (
                <SelectItem key={p} value={i.toString()} className="text-black">
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            type="string"
            className="w-full text-black placeholder:text-black"
          />
          <Input
            placeholder="Contact Number"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="w-full text-black placeholder:text-black"
          />
          <Input type="file" accept="image/*" className="w-full text-black" />

          {/* Term Start Date Picker */}
          <div>
            <label className="text-sm font-medium">Term Start</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left text-black"
                >
                  {termStart ? format(termStart, "PPP") : "Select date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={termStart}
                  onSelect={setTermStart}
                  captionLayout="dropdown"
                  fromYear={2000}
                  toYear={new Date().getFullYear() + 10}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Term End Date Picker */}
          <div>
            <label className="text-sm font-medium">Term End</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left text-black"
                >
                  {termEnd ? format(termEnd, "PPP") : "Select date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={termEnd}
                  onSelect={setTermEnd}
                  captionLayout="dropdown"
                  fromYear={2000}
                  toYear={new Date().getFullYear() + 10}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Input
            placeholder="Zone Assigned"
            value={form.assignedZone}
            onChange={(e) => setForm({ ...form, assignedZone: e.target.value })}
            className="w-full text-black placeholder:text-black"
          />

          <Button
            className="w-full text-white bg-blue-600 hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
