import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { toast } from "sonner";

type Event = {
  name: string,
  type: string,
  status: "Upcoming" | "Finished" | "Ongoing" | "Cancelled",
  date: Date,
  venue: string,
  atendee: string,
  notes: string
}
export default function CancelEventModal(event: Event) {

  function onConfirm() {
    toast.success("Event cancelled succesfully", {
      description: `${event.name} was cancelled`
    })

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
              <Button onClick={onConfirm}>Confirm</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
