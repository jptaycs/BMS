import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { toast } from "sonner";

type Income = {
  type: string,
  amount: number,
  or: number,
  receivedFrom: string,
  receivedBy: string,
  date: Date,
}
export default function DeleteIncomeModal(income: Income) {

  function onConfirm() {
    toast.success("Income deleted succesfully", {
      description: `${income.type} was deleted`
    })

  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <XIcon />
            Delete Income
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black font-normal">Income Deletion</DialogTitle>
            <DialogDescription className="text-sm font-bold">This action cannot be undone once confirmed</DialogDescription>
          </DialogHeader>
          <div className="text-black text-lg font-bold">Are you sure you want to delete this income?</div>
          <div className="flex w-full gap-3 justify-end">
            <DialogClose asChild>
              <Button variant="destructive">Delete</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={onConfirm}>Confirm</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
