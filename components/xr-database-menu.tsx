"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Database, Upload, Download, BarChart } from "lucide-react"
import { useState } from "react"
import { ImportExcelModal } from "./import-excel-modal"
import { ExportDataModal } from "./export-data-modal"
import { StatisticsModal } from "./statistics-modal"

export function XRDatabaseMenu() {
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [statisticsModalOpen, setStatisticsModalOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="mb-4">
            <Database className="mr-2 h-4 w-4" />
            XR Database
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Database Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setImportModalOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Import from Excel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setExportModalOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatisticsModalOpen(true)}>
            <BarChart className="mr-2 h-4 w-4" />
            View Statistics
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ImportExcelModal open={importModalOpen} onOpenChange={setImportModalOpen} />
      <ExportDataModal open={exportModalOpen} onOpenChange={setExportModalOpen} />
      <StatisticsModal open={statisticsModalOpen} onOpenChange={setStatisticsModalOpen} />
    </>
  )
}

