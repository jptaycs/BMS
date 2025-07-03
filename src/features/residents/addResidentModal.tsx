import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { invoke } from "@tauri-apps/api/core";

const civilStatusOptions = ["Single", "Married", "Widowed", "Separated"];
const genderOptions = ["Male", "Female"];
const suffixOptions = ["Jr.", "Sr.", "II", "III"];
const prefixOptions = ["Mr.", "Mrs.", "Ms."];

const formSchema = z.object({
  prefix: z.string(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  suffix: z.string().optional(),
  civilStatus: z.string(),
  gender: z.string(),
  mobileNumber: z.string(),
  dateOfBirth: z.date(),
  cityOfBirth: z.string(),
  countryOfBirth: z.string(),
  nationality: z.string(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  mailingAddress: z.string(),
  employer: z.string(),
  employerAddress: z.string(),
  employerCity: z.string(),
  employerProvince: z.string(),
  employerZip: z.string(),
  fatherName: z.string(),
  fatherDOB: z.string(),
  fatherIllness: z.string(),
  fatherAlive: z.string(),
  motherName: z.string(),
  motherDOB: z.string(),
  motherIllness: z.string(),
  motherAlive: z.string(),
  siblingsAlive: z.string(),
  siblingsDOB: z.string(),
  children: z.string(),
  height: z.string(),
  weight: z.string(),
  medicalConditions: z.string(),
  privateDoctor: z.string(),
  beneficiaryName: z.string(),
  beneficiaryRelation: z.string(),
  beneficiaryContact: z.string(),
  beneficiaryDOB: z.string(),
  beneficiaryGender: z.string(),
  beneficiaryType: z.string(),
  beneficiarySameAddress: z.string(),
  additionalBeneficiaries: z.string(),
});

export default function AddResidentModal() {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prefix: "",
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      civilStatus: "",
      gender: "",
      mobileNumber: "",
      dateOfBirth: undefined,
      cityOfBirth: "",
      countryOfBirth: "",
      nationality: "",
      presentAddress: "",
      permanentAddress: "",
      mailingAddress: "",
      employer: "",
      employerAddress: "",
      employerCity: "",
      employerProvince: "",
      employerZip: "",
      fatherName: "",
      fatherDOB: "",
      fatherIllness: "",
      fatherAlive: "",
      motherName: "",
      motherDOB: "",
      motherIllness: "",
      motherAlive: "",
      siblingsAlive: "",
      siblingsDOB: "",
      children: "",
      height: "",
      weight: "",
      medicalConditions: "",
      privateDoctor: "",
      beneficiaryName: "",
      beneficiaryRelation: "",
      beneficiaryContact: "",
      beneficiaryDOB: "",
      beneficiaryGender: "",
      beneficiaryType: "",
      beneficiarySameAddress: "",
      additionalBeneficiaries: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Resident added successfully", {
      description: `${values.firstName} ${values.lastName}`,
    });
    setOpenModal(false);
    invoke("save_resident", { data: values });
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Plus /> Add Resident
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto text-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
            <DialogTitle>Add Resident Information</DialogTitle>
            <DialogDescription>All the fields are required unless it is mentioned otherwise</DialogDescription>
            <h2 className="text-md font-semibold text-gray-900 mt-2">Personal Information</h2>
          </DialogHeader>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "prefix", label: "Prefix", options: prefixOptions },
                { name: "firstName", label: "First Name" },
                { name: "middleName", label: "Middle Name" },
                { name: "lastName", label: "Last Name" },
                { name: "suffix", label: "Suffix", options: suffixOptions },
                { name: "civilStatus", label: "Civil Status", options: civilStatusOptions },
                { name: "gender", label: "Gender", options: genderOptions },
              ].map(({ name, label, options }) => (
                <FormField key={name} control={form.control} name={name as any} render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {options ? (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input {...field} />
                      )}
                    </FormControl>
                  </FormItem>
                )} />
              ))}
            </div>

            <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                      <CalendarIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )} />

            <div className="flex justify-end pt-4">
              <Button type="submit">Save Resident</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}