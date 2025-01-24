"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function LiveTime() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="text-4xl font-bold py-4 pl-2 mb-6 rounded-lg shadow-md inline-block"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        {time.toLocaleTimeString()}
      </span>
    </motion.div>
  )
}

