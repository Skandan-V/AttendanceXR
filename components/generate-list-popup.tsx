import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface GenerateListPopupProps {
  open: boolean
  onClose: () => void
}

export function GenerateListPopup({ open, onClose }: GenerateListPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Absentees List Generated</DialogTitle>
          <DialogDescription>
            The list has been copied to your clipboard. You can now paste it wherever you need.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

