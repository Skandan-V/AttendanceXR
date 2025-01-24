"use client"

import { Header } from "@/components/header"
import { StudentList } from "@/components/student-list"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { UpdatesDrawer } from "@/components/updates-drawer"
import { GuidedTour } from "@/components/guided-tour"
import { LiveTime } from "@/components/live-time"
import { motion, AnimatePresence } from "framer-motion"
import { Toaster as SonnerToaster } from "sonner"
import { useState } from "react"

export default function Page() {
  const [showPopup, setShowPopup] = useState(false)

  const handleListGenerated = () => {
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 3000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <Breadcrumbs />
      <main className="flex-grow p-6 overflow-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6 flex">
            <LiveTime />
          </div>
          <StudentList onListGenerated={handleListGenerated} />
          <div className="mt-8 flex justify-end">
            <UpdatesDrawer />
          </div>
        </motion.div>
      </main>
      <Footer />
      <Toaster />
      <GuidedTour />
      <SonnerToaster />
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg"
          >
            Absentees list generated and copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

