"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface StatisticsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock data for the chart
const data = [
  { name: "Jan", attendance: 30 },
  { name: "Feb", attendance: 28 },
  { name: "Mar", attendance: 32 },
  { name: "Apr", attendance: 35 },
  { name: "May", attendance: 33 },
  { name: "Jun", attendance: 31 },
]

export function StatisticsModal({ open, onOpenChange }: StatisticsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Attendance Statistics</DialogTitle>
          <DialogDescription>View attendance statistics for the past months.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="attendance" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

