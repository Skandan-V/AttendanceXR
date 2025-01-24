import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const updates = [
  {
    date: "2025-01-22",
    changes: [
      "Added teacher selection feature",
      "Extended subject abbreviations",
      "Implemented summary display with more details",
      "Created horizontal cards for Updates log",
      "Minimized 'show more' feature for manage students section",
      "Updated absentees list to include teacher's name",
    ],
  },
  {
    date: "2025-01-21",
    changes: [
      "Implemented date-specific attendance checking",
      "Added statistical analysis charts",
      "Changed 'Classes' to 'Departments'",
      "Added default names for 'Information Science' department",
    ],
  },
  {
    date: "2025-01-20",
    changes: [
      "Implemented Excel import feature",
      "Added database export (Excel, PDF, CSV)",
      "Implemented name filtering and sorting",
    ],
  },
]

export function UpdatesLog() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Updates Log</CardTitle>
        <CardDescription>Recent changes and improvements to AttendanceXR</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {updates.map((update, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{update.date}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside">
                  {update.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="text-sm text-muted-foreground">
                      {change}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

