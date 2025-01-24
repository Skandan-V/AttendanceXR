"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function BugReport() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("https://api.hyperdyn.tech/bug-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, description }),
      })
      if (response.ok) {
        toast({
          title: "Bug Report Submitted",
          description: "Thank you for your feedback. We'll look into it shortly.",
        })
        setName("")
        setEmail("")
        setDescription("")
      } else {
        throw new Error("Failed to submit bug report")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit bug report. Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Bug Description
        </label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <Button type="submit">Submit Bug Report</Button>
    </form>
  )
}

