import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useState } from "react";
import { toast } from "sonner";
import { invoke } from '@tauri-apps/api/core'
import { incomeSchema } from "@/types/formSchema";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export default function AddIncomeModal() {
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const form = useForm<z.infer<typeof incomeSchema>>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      type: "",
      amount: 0,
      or: 0,
      receivedFrom: "",
      receivedBy: "",
      date: undefined,
    }
  })

  function onSubmit(values: z.infer<typeof incomeSchema>) {
    toast.success("Income added sucessfully", {
      description: `${values.type} was added`
    })
    setOpenModal(false)
    invoke("greet")
  }

  return (
    <>
      <Dialog
        open={openModal}
        onOpenChange={setOpenModal}
      >
        <DialogTrigger asChild>
          <Button size="lg" >
            <Plus />
            Add Income
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle className="text-black">Create Income</DialogTitle>
                <DialogDescription className="text-sm">
                  All the fields are required unless it is mentioned otherwise
                </DialogDescription>
                <p className="text-md font-bold text-black">Basic Income Information</p>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                <div>
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="type" className="text-black font-bold text-xs">Income Number</FormLabel>
                        <FormControl>
                          <Input
                            id="type"
                            type="text"
                            placeholder="Enter Income name"
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
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="amount" className="text-black font-bold text-xs">Amount</FormLabel>
                        <FormControl>
                          <Input
                            id="amount"
                            type="text"
                            placeholder="Enter Income name"
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
                    name="or"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="or" className="text-black font-bold text-xs">OR#</FormLabel>
                        <FormControl>
                          <Input
                            id="or"
                            type="text"
                            placeholder="Enter OR#"
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
                    name="receivedFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="receivedFrom" className="text-black font-bold text-xs">Received From</FormLabel>
                        <FormControl>
                          <Input
                            id="receivedFrom"
                            type="text"
                            placeholder="Enter Received From"
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
                    name="receivedBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="receivedBy" className="text-black font-bold text-xs">Received From</FormLabel>
                        <FormControl>
                          <Input
                            id="receivedBy"
                            type="text"
                            placeholder="Enter Received By"
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
                        <FormLabel htmlFor="date" className="text-black font-bold text-xs">Date of Residency</FormLabel>
                        <Popover
                          open={openCalendar}
                          onOpenChange={setOpenCalendar}
                        >
                          <FormControl>
                            <PopoverTrigger asChild className="w-full text-black hover:bg-primary hover:text-white">
                              <Button
                                variant="outline"
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
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
            
              </div>
              <div className="mt-4 flex justify-end">
                <Button>Save Income</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog >
    </>
  )
}

