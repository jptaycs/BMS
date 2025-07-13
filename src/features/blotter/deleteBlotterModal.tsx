import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Blotter } from "@/types/types";
import { XIcon } from "lucide-react";
import { toast } from "sonner";

export default function DeleteBlotterModal(blotter: Blotter) {

  function onConfirm() {
    toast.success("Event deleted succesfully", {
      description: `${blotter.type} was deleted`
    })

  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <XIcon />
            Delete Blotter
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black font-normal">Blotter Deletion</DialogTitle>
            <DialogDescription className="text-sm font-bold">This action cannot be undone once confirmed</DialogDescription>
          </DialogHeader>
          <div className="text-black text-lg font-bold">Are you sure you want to delete this blotter?</div>
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
