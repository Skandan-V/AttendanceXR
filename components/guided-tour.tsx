"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const tourSteps = [
  {
    title: "Welcome to AttendanceXR",
    description: "This tour will guide you through the main features of the application.",
  },
  {
    title: "Select Department",
    description: "Start by selecting a department from the dropdown menu.",
  },
  {
    title: "Choose Subject",
    description: "Next, choose the subject for which you want to mark attendance.",
  },
  {
    title: "Select Teacher",
    description: "Click the teacher icon to select the teacher for this class.",
  },
  {
    title: "Mark Attendance",
    description: "Use the checkboxes to mark students as absent.",
  },
  {
    title: "Generate Absentees List",
    description: "Click the 'Generate Absentees List' button to create and copy the list of absent students.",
  },
  {
    title: "View Summary",
    description: "Click the summary icon to see a quick overview of today's attendance.",
  },
]

export function GuidedTour() {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour")
    if (!hasSeenTour) {
      setOpen(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handleClose = () => {
    setOpen(false)
    if (dontShowAgain) {
      localStorage.setItem("hasSeenTour", "true")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{tourSteps[currentStep].title}</DialogTitle>
          <DialogDescription>{tourSteps[currentStep].description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 py-4">
          <Checkbox id="dontShowAgain" checked={dontShowAgain} onCheckedChange={setDontShowAgain} />
          <Label htmlFor="dontShowAgain">Don't show this tour again</Label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Skip Tour
          </Button>
          <Button onClick={handleNext}>{currentStep === tourSteps.length - 1 ? "Finish" : "Next"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

