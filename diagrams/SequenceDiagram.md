# Sequence Diagrams - Student Result Management System

## Sequence Diagram: Add Student

```
┌──────┐         ┌──────┐         ┌──────────────────────┐
│ User │         │ Main │         │ StudentManagement    │
└───┬──┘         └───┬──┘         └──────┬───────────────┘
    │                │                    │
    │  Select "Add   │                    │
    │   Student"     │                    │
    ├───────────────►│                    │
    │                │                    │
    │                │  Prompt for ID     │
    │                │◄───────────────────┤
    │                │                    │
    │  Enter ID      │                    │
    ├───────────────►│                    │
    │                │                    │
    │                │  findStudent(id)   │
    │                ├───────────────────►│
    │                │                    │
    │                │                    │  Check if exists
    │                │                    │  in ArrayList
    │                │                    │
    │                │   return Student/  │
    │                │   null             │
    │                │◄───────────────────┤
    │                │                    │
    │                │                    │
    │       ┌────────┴────────┐          │
    │       │                 │          │
    │    EXISTS            NOT EXISTS    │
    │       │                 │          │
    │       ▼                 ▼          │
    │  Show Error     Prompt for Name    │
    │  & Course                          │
    │                                    │
    │                     addStudent(...)│
    │                     ├─────────────►│
    │                     │              │
    │                     │              │  Create Student
    │                     │              │  Object
    │                     │              │
    │                     │              │  Add to ArrayList
    │                     │              │
    │       return true   │              │
    │       ◄─────────────┤              │
    │                     │              │
    │  Show Success       │              │
    │  Message            │              │
    │◄────────────────────┤              │
    │                     │              │
```

## Sequence Diagram: Add Marks

```
┌──────┐    ┌──────┐    ┌────────────────────┐    ┌──────────┐
│ User │    │ Main │    │ StudentManagement  │    │ Student  │
└───┬──┘    └───┬──┘    └──────────┬─────────┘    └────┬─────┘
    │           │                  │                    │
    │ Select    │                  │                    │
    │ "Add      │                  │                    │
    │ Marks"    │                  │                    │
    ├──────────►│                  │                    │
    │           │                  │                    │
    │           │ Prompt for ID    │                    │
    │           │◄─────────────────┤                    │
    │           │                  │                    │
    │ Enter ID  │                  │                    │
    ├──────────►│                  │                    │
    │           │                  │                    │
    │           │  findStudent(id) │                    │
    │           ├─────────────────►│                    │
    │           │                  │                    │
    │           │                  │  Search ArrayList  │
    │           │                  │                    │
    │           │   return Student │                    │
    │           │   or null        │                    │
    │           │◄─────────────────┤                    │
    │           │                  │                    │
    │      ┌────┴────┐             │                    │
    │      │         │             │                    │
    │   NOT FOUND  FOUND           │                    │
    │      │         │             │                    │
    │      ▼         ▼             │                    │
    │  Show Error  Prompt for      │                    │
    │              Subject &       │                    │
    │              Marks           │                    │
    │                              │                    │
    │                addMarks(...) │                    │
    │                ├────────────►│                    │
    │                │             │                    │
    │                │             │  Validate marks    │
    │                │             │  (0-100)           │
    │                │             │                    │
    │                │             │  setMarks()        │
    │                │             ├───────────────────►│
    │                │             │                    │
    │                │             │  Update marks      │
    │                │             │  in Student        │
    │                │             │                    │
    │                │   return    │                    │
    │                │   true      │                    │
    │                │◄────────────┤                    │
    │                │             │                    │
    │  Show Success  │             │                    │
    │  Message       │             │                    │
    │◄───────────────┤             │                    │
    │                │             │                    │
```

## Sequence Diagram: Generate Report

```
┌──────┐    ┌──────┐    ┌────────────────────┐    ┌──────────┐
│ User │    │ Main │    │ StudentManagement  │    │ Student  │
└───┬──┘    └───┬──┘    └──────────┬─────────┘    └────┬─────┘
    │           │                  │                    │
    │ Select    │                  │                    │
    │ "View     │                  │                    │
    │ Report"   │                  │                    │
    ├──────────►│                  │                    │
    │           │                  │                    │
    │           │ Prompt for ID    │                    │
    │           │◄─────────────────┤                    │
    │           │                  │                    │
    │ Enter ID  │                  │                    │
    ├──────────►│                  │                    │
    │           │                  │                    │
    │           │  findStudent(id) │                    │
    │           ├─────────────────►│                    │
    │           │                  │                    │
    │           │                  │  Search ArrayList  │
    │           │                  │                    │
    │           │   return Student │                    │
    │           │◄─────────────────┤                    │
    │           │                  │                    │
    │           │                  │                    │
    │           │  Get student     │                    │
    │           │  data            │                    │
    │           │                  │                    │
    │           │  calculateAverage()                   │
    │           │                  ├───────────────────►│
    │           │                  │                    │
    │           │                  │  Calculate from    │
    │           │                  │  three subjects    │
    │           │                  │                    │
    │           │    return avg    │                    │
    │           │◄─────────────────┤                    │
    │           │                  │                    │
    │           │  getGrade()      │                    │
    │           │                  ├───────────────────►│
    │           │                  │                    │
    │           │                  │  Determine grade   │
    │           │                  │  from percentage   │
    │           │                  │                    │
    │           │    return grade  │                    │
    │           │◄─────────────────┤                    │
    │           │                  │                    │
    │           │  isPassed()      │                    │
    │           │                  ├───────────────────►│
    │           │                  │                    │
    │           │                  │  Check all marks   │
    │           │                  │  >= 40             │
    │           │                  │                    │
    │           │    return status │                    │
    │           │◄─────────────────┤                    │
    │           │                  │                    │
    │           │  Format &        │                    │
    │           │  Display Report  │                    │
    │           │                  │                    │
    │  View     │                  │                    │
    │  Report   │                  │                    │
    │◄──────────┤                  │                    │
    │           │                  │                    │
```

## Sequence Diagram: Generate Summary

```
┌──────┐    ┌──────┐    ┌────────────────────┐    ┌──────────┐
│ User │    │ Main │    │ StudentManagement  │    │ Student  │
└───┬──┘    └───┬──┘    └──────────┬─────────┘    └────┬─────┘
    │           │                  │                    │
    │ Select    │                  │                    │
    │ "Summary" │                  │                    │
    ├──────────►│                  │                    │
    │           │                  │                    │
    │           │  generateSummary()                    │
    │           ├─────────────────►│                    │
    │           │                  │                    │
    │           │                  │  getAllStudents()  │
    │           │                  │  (returns ArrayList)│
    │           │                  │                    │
    │           │                  │  Loop through      │
    │           │                  │  each Student      │
    │           │                  │                    │
    │           │                  │  For each Student: │
    │           │                  │  calculateAverage()│
    │           │                  ├───────────────────►│
    │           │                  │                    │
    │           │                  │  getGrade()        │
    │           │                  ├───────────────────►│
    │           │                  │                    │
    │           │                  │  isPassed()        │
    │           │                  ├───────────────────►│
    │           │                  │                    │
    │           │                  │  Collect results   │
    │           │                  │  and count stats   │
    │           │                  │                    │
    │           │                  │  Format summary    │
    │           │                  │  table             │
    │           │                  │                    │
    │           │  Display         │                    │
    │           │  Summary         │                    │
    │           │◄─────────────────┤                    │
    │           │                  │                    │
    │  View     │                  │                    │
    │  Summary  │                  │                    │
    │◄──────────┤                  │                    │
    │           │                  │                    │
```
