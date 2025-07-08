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
import { expenseSchema } from "@/types/formSchema";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export default function AddExpenseModal() {
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      type: "",
      amount: 0,
      or: 0,
      paidFrom: "",
      paidBy: "",
      date: undefined,
    }
  })

  function onSubmit(values: z.infer<typeof expenseSchema>) {
    toast.success("Expense added sucessfully", {
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
            Add Expense
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle className="text-black">Create Expense</DialogTitle>
                <DialogDescription className="text-sm">
                  All the fields are required unless it is mentioned otherwise
                </DialogDescription>
                <p className="text-md font-bold text-black">Basic Expense Information</p>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                <div>
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="type" className="text-black font-bold text-xs">Expense Number</FormLabel>
                        <FormControl>
                          <Input
                            id="type"
                            type="text"
                            placeholder="Enter expense name"
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
                    name="paidFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="paidFrom" className="text-black font-bold text-xs">Paid From</FormLabel>
                        <FormControl>
                          <Input
                            id="paidFrom"
                            type="text"
                            placeholder="Enter Paid From"
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
                    name="paidBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="paidBy" className="text-black font-bold text-xs">Paid From</FormLabel>
                        <FormControl>
                          <Input
                            id="paidBy"
                            type="text"
                            placeholder="Enter Paid By"
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
                <Button>Save Expense</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog >
    </>
  )
}

