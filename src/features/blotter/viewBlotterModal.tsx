import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, residentSchema } from "@/types/formSchema";
import { CalendarIcon, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { toast } from "sonner";
import { Blotter } from "@/types/types";

const selectStatus: string[] = [
  "On Going",
  "Active",
  "Transferred to Police",
  "Closed",
]

const blotterSchema = z.object({
  type: z.string().min(2, {
    message: "Resident name is too short"
  }).max(50, {
    message: "Resident name is too long, put other details on the 'details' form"
  }),
  reportedBy: z.string().min(2, {
    message: "Resident type is too short"
  }).max(50, {
    message: "Resident type is too long."
  }),
  involved: z.string().min(2, {
    message: "Resident venue is too short"
  }).max(50, {
    message: "Resident venue is too long"
  }),
  date: z.date({
    required_error: "Please specify the event date"
  }),
  location: z.string().min(2, {
    message: "Resident too long"
  }).max(50, {
    message: "Resident venue is too long"
  }),
  zone: z.string().min(2, {
    message: "Resident too long"
  }).max(50, {
    message: "Resident venue is too long"
  }),
  status: z.string().max(1000, {
    message: "Important notes is too long"
  }),
  narrative: z.string().min(2, {
    message: "Resident too long"
  }).max(50, {
    message: "Resident venue is too long"
  }),
})

export default function ViewBlotterModal(props: Blotter) {
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const form = useForm<z.infer<typeof blotterSchema>>({
    resolver: zodResolver(blotterSchema),
    defaultValues: {
      type: props.type,
      reportedBy: props.reportedBy,
      involved: props.involved,
      date: props.date,
      location: props.location,
      zone: props.zone,
      status: props.status,
      // narrative: props.narrative,
      // action: props.action,
      // witnesses: props.witnesses,
      // evidence: props.evidence,
      // resolution: props.resolution,
      // hearingDate: props.hearingDate
    }
  })

  function onSubmit(values: z.infer<typeof blotterSchema>) {
    toast.success("Blotter updated successfully", {
      description: `${values.type} was updated`
    })
    setOpenModal(false)
  }
  return (
    <>
      <Dialog
        open={openModal}
        onOpenChange={setOpenModal}
      >
        <DialogTrigger asChild>
          <Button>
            <Eye />
            View More
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((onSubmit))}>
              <DialogHeader>
                <DialogTitle className="text-black">View More Details</DialogTitle>
                <DialogDescription className="text-sm">
                  All the fields are required unless it is mentioned otherwise
                </DialogDescription>
                <p className="text-md font-bold text-black">Basic Blotter Information</p>
              </DialogHeader>
              <div className="flex flex-col gap-3">

                <div>
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="fullName" className="text-black font-bold text-xs">Type</FormLabel>
                        <FormControl>
                          <Input
                            id="type"
                            type="text"
                            placeholder="Enter full name"
                            required
                            {...field}
                            className="text-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="reportedBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="reportedBy" className="text-black font-bold text-xs">Reported By</FormLabel>
                        <FormControl>
                          <Input
                            id="reportedBy"
                            type="text"
                            placeholder="Enter full name"
                            required
                            {...field}
                            className="text-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="involved"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="involved" className="text-black font-bold text-xs">Person Involved</FormLabel>
                        <FormControl>
                          <Input
                            id="involved"
                            type="text"
                            placeholder="Enter full name"
                            required
                            {...field}
                            className="text-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="date" className="text-black font-bold text-xs">Date</FormLabel>
                        <Popover
                          open={openCalendar}
                          onOpenChange={setOpenCalendar}
                        >
                          <FormControl>
                            <PopoverTrigger
                              asChild
                              className="w-full text-black hover:bg-primary hover:text-white"
                            >
                              <Button
                                variant="outline"
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Date of Incident</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4  hover:text-white" />
                              </Button>
                            </PopoverTrigger>
                          </FormControl>
                          <PopoverContent className="w-auto p-0" align="center">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout="dropdown"
                              onDayClick={() => setOpenCalendar(false)}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="location" className="text-black font-bold text-xs">Location</FormLabel>
                        <FormControl>
                          <Input
                            id="location"
                            type="text"
                            placeholder="Enter location"
                            required
                            {...field}
                            className="text-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="zone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="zone" className="text-black font-bold text-xs">Zone/Purok</FormLabel>
                        <FormControl>
                          <Input
                            id="zone"
                            type="text"
                            placeholder="Enter full name"
                            required
                            {...field}
                            className="text-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>


                <div>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="status" className="text-black font-bold text-xs">Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full text-black border-black/15">
                              <SelectValue placeholder={"Please select civil status"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {selectStatus.map((option, i) => (
                              <SelectItem value={option} key={i}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

              </div>
              <div className="mt-4 flex justify-end">
                {props.status == "Active" && <Button type="submit">Save Blotter</Button>}
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog >
    </>
  )
}
