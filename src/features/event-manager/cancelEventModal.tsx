import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";

export default function CancelEventModal() {

  function onConfirm() {
    console.log("Event Cancelled")
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <XIcon />
            Cancel Event
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black font-normal">Event Cancellation</DialogTitle>
            <DialogDescription className="text-sm font-bold">This action cannot be undone once confirmed</DialogDescription>
          </DialogHeader>
          <div className="text-black text-lg font-bold">Are you sure you want to cancel this event?</div>
          <div className="flex w-full gap-3 justify-end">
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={onConfirm} >Confirm</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
