"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Search, ChevronDown, ChevronUp, FileText, Users } from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"
import { GenerateListPopup } from "./generate-list-popup"

interface StudentListProps {
  onListGenerated: () => void
}

const defaultStudents = [
  "Adarsh M",
  "Amith Gill Christ",
  "Arun D",
  "Diganth N",
  "Eshwar M S",
  "Ganesh G Y",
  "Gowtham C",
  "Hemamth A",
  "Hemanth Kumar S",
  "Kishore S G",
  "Kushal Gowda D",
  "Madan N",
  "Manish Raju M V",
  "Mohammed Ali Hussain",
  "N Harsha",
  "Nagarjun M",
  "Nithin Jerom D",
  "Omkar S",
  "P Dhanush",
  "Pavan Kumar C",
  "Poorvik Gowda D M",
  "Prajwal V",
  "Shashank A",
  "Shivakumar S",
  "Shravan Urs",
  "Skandan V",
  "Tharun H R",
  "Ullas M",
  "Varshith S M",
  "Vinay Kumar",
  "Yashwanth S",
  "Yathish N",
]

const defaultSubjects = [
  { abbr: "MA", full: "Multimedia & Animation" },
  { abbr: "SA", full: "Statistical &   Analysis" },
  { abbr: "CAED", full: "Computer Aided Engineering & Graphics" },
  { abbr: "CS", full: "Computer Skills" },
  { abbr: "SS-1", full: "Saahitya Sinchana" },
  { abbr: "BK-1", full: "Balake Kannada" },
  { abbr: "PMS", full: "Project Management Skills" },
]

const teachers = ["Shruthi M", "Pradeep Kumar", "Tejaswini MP", "D.R Veena", "Panakaja H.N", "Sowrabha M.C"]

export function StudentList({ onListGenerated }: StudentListProps) {
  const [students, setStudents] = useState<{ id: number; name: string }[]>([])
  const [absentees, setAbsentees] = useState<number[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState("")
  const [departments, setDepartments] = useState<string[]>(["Information Science"])
  const [subjects, setSubjects] = useState<typeof defaultSubjects>([])
  const [newStudentName, setNewStudentName] = useState("")
  const [newDepartmentName, setNewDepartmentName] = useState("")
  const [newSubjectName, setNewSubjectName] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showAllStudents, setShowAllStudents] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [showTeacherSelect, setShowTeacherSelect] = useState(false)
  const [showGeneratePopup, setShowGeneratePopup] = useState(false)
  //const [showCopiedPopup, setShowCopiedPopup] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (selectedDepartment === "Information Science") {
      setStudents(defaultStudents.map((name, index) => ({ id: index + 1, name })))
      setSubjects(defaultSubjects)
    } else {
      setStudents([])
      setSubjects([])
    }
  }, [selectedDepartment])

  const handleCheckboxChange = (studentId: number) => {
    setAbsentees((prev) => (prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]))
  }

  const generateAbsenteesList = () => {
    if (!selectedDepartment || !selectedSubject) {
      toast.error("Please select both department and subject.")
      return
    }

    const absenteeNames = students.filter((student) => absentees.includes(student.id)).map((student) => student.name)

    const currentDate = format(selectedDate || new Date(), "MMMM d, yyyy")
    const selectedSubjectFull = subjects.find((s) => s.abbr === selectedSubject)?.full || selectedSubject
    let list = `Absentees list for ${selectedDepartment} (${selectedSubjectFull}) on ${currentDate}:
${absenteeNames.map((name, index) => `${index + 1}. ${name} `).join("\n")}
${selectedTeacher ? `Teacher: ${selectedTeacher}` : ""}`

    if (showSummary) {
      list += `\n\n${absentees.length} Students were absent today for the ${selectedSubjectFull} class`
    }

    navigator.clipboard.writeText(list).then(() => {
      setShowGeneratePopup(true)
    })
  }

  const addStudent = () => {
    if (newStudentName.trim()) {
      setStudents((prev) => [...prev, { id: Date.now(), name: newStudentName.trim() }])
      setNewStudentName("")
      toast({
        title: "Student Added",
        description: `${newStudentName} has been added to the list.`,
      })
    }
  }

  const addDepartment = () => {
    if (newDepartmentName.trim() && !departments.includes(newDepartmentName.trim())) {
      setDepartments((prev) => [...prev, newDepartmentName.trim()])
      setNewDepartmentName("")
      toast({
        title: "Department Added",
        description: `${newDepartmentName} has been added to the list.`,
      })
    }
  }

  const addSubject = () => {
    if (newSubjectName.trim() && !subjects.some((s) => s.abbr === newSubjectName.trim())) {
      setSubjects((prev) => [...prev, { abbr: newSubjectName.trim(), full: newSubjectName.trim() }])
      setNewSubjectName("")
      toast({
        title: "Subject Added",
        description: `${newSubjectName} has been added to the list.`,
      })
    }
  }

  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const displayedStudents = showAllStudents ? filteredStudents : filteredStudents.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        {isSearchVisible ? (
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        ) : null}
        <Button variant="outline" size="icon" onClick={() => setIsSearchVisible(!isSearchVisible)}>
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => setShowSummary(!showSummary)}>
          <FileText className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => setShowTeacherSelect(!showTeacherSelect)}>
          <Users className="h-4 w-4" />
        </Button>
        {showSummary && (
          <span className="text-sm text-muted-foreground">
            {absentees.length} Students were absent today for the{" "}
            {subjects.find((s) => s.abbr === selectedSubject)?.full || selectedSubject} class
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="department-select">Department</Label>
        <Select onValueChange={setSelectedDepartment} value={selectedDepartment}>
          <SelectTrigger id="department-select">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject-select">Subject</Label>
        <Select onValueChange={setSelectedSubject} value={selectedSubject}>
          <SelectTrigger id="subject-select">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.abbr} value={subject.abbr}>
                {subject.full} ({subject.abbr})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {showTeacherSelect && (
        <div className="space-y-2">
          <Label htmlFor="teacher-select">Teacher</Label>
          <Select onValueChange={setSelectedTeacher} value={selectedTeacher}>
            <SelectTrigger id="teacher-select">
              <SelectValue placeholder="Select a teacher" />
            </SelectTrigger>
            <SelectContent>
              {teachers.map((teacher) => (
                <SelectItem key={teacher} value={teacher}>
                  {teacher}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="date-picker">Date</Label>
        <DatePicker id="date-picker" selected={selectedDate} onSelect={setSelectedDate} />
      </div>
      <div className="space-y-4">
        {displayedStudents.map((student) => (
          <div key={student.id} className="flex items-center">
            <Checkbox
              id={`student-${student.id}`}
              checked={absentees.includes(student.id)}
              onCheckedChange={() => handleCheckboxChange(student.id)}
            />
            <Label htmlFor={`student-${student.id}`} className="flex items-center flex-1 ml-2">
              {student.name}
            </Label>
            <span
              className={`inline-block w-2 h-2 rounded-full ${absentees.includes(student.id) ? "bg-red-500" : "bg-green-500"}`}
            ></span>
          </div>
        ))}
      </div>
      {filteredStudents.length > 3 && (
        <Button variant="outline" onClick={() => setShowAllStudents(!showAllStudents)}>
          {showAllStudents ? (
            <>
              Show Less <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      )}
      <Button onClick={generateAbsenteesList}>Generate Absentees List</Button>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Manage Students</CardTitle>
              <CardDescription>Add or remove students from the list.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Enter student name"
                />
                <Button onClick={addStudent}>Add</Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {students.map((student) => (
                  <div key={student.id} className="flex justify-between items-center">
                    <span>{student.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setStudents((prev) => prev.filter((s) => s.id !== student.id))
                        toast({
                          title: "Student Removed",
                          description: `${student.name} has been removed from the list.`,
                        })
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Manage Departments</CardTitle>
              <CardDescription>Add or remove departments from the list.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  value={newDepartmentName}
                  onChange={(e) => setNewDepartmentName(e.target.value)}
                  placeholder="Enter department name"
                />
                <Button onClick={addDepartment}>Add</Button>
              </div>
              <div className="space-y-2">
                {departments.map((department) => (
                  <div key={department} className="flex justify-between items-center">
                    <span>{department}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setDepartments((prev) => prev.filter((d) => d !== department))
                        toast({
                          title: "Department Removed",
                          description: `${department} has been removed from the list.`,
                        })
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="subjects">
          <Card>
            <CardHeader>
              <CardTitle>Manage Subjects</CardTitle>
              <CardDescription>Add or remove subjects from the list.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  placeholder="Enter subject name"
                />
                <Button onClick={addSubject}>Add</Button>
              </div>
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <div key={subject.abbr} className="flex justify-between items-center">
                    <span>
                      {subject.full} ({subject.abbr})
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSubjects((prev) => prev.filter((s) => s.abbr !== subject.abbr))
                        toast({
                          title: "Subject Removed",
                          description: `${subject.full} has been removed from the list.`,
                        })
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
      {/*<AnimatePresence>
        {showCopiedPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg"
          >
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>*/}
      <GenerateListPopup open={showGeneratePopup} onClose={() => setShowGeneratePopup(false)} />
    </div>
  )
}

