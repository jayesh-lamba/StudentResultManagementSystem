# Class Diagram - Student Result Management System (Simplified Version)

```
┌─────────────────────────────────────────────────────────────────┐
│                         Student                                  │
├─────────────────────────────────────────────────────────────────┤
│ - studentId: String                                             │
│ - name: String                                                  │
│ - course: String                                                │
│ - mathMarks: double                                             │
│ - scienceMarks: double                                          │
│ - englishMarks: double                                          │
├─────────────────────────────────────────────────────────────────┤
│ + Student(studentId, name, course)                              │
│ + getStudentId(): String                                        │
│ + getName(): String                                             │
│ + getCourse(): String                                           │
│ + getMathMarks(): double                                        │
│ + getScienceMarks(): double                                     │
│ + getEnglishMarks(): double                                     │
│ + setName(name): void                                           │
│ + setCourse(course): void                                       │
│ + setMathMarks(marks): void                                     │
│ + setScienceMarks(marks): void                                  │
│ + setEnglishMarks(marks): void                                  │
│ + calculateAverage(): double                                    │
│ + calculatePercentage(): double                                 │
│ + getGrade(): String                                            │
│ + isPassed(): boolean                                           │
│ + displayInfo(): void                                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    StudentManagement                             │
├─────────────────────────────────────────────────────────────────┤
│ - students: ArrayList<Student>                                  │
├─────────────────────────────────────────────────────────────────┤
│ + StudentManagement()                                           │
│ + addStudent(id, name, course): boolean                         │
│ + findStudent(id): Student                                      │
│ + updateStudentName(id, name): boolean                          │
│ + updateStudentCourse(id, course): boolean                      │
│ + deleteStudent(id): boolean                                    │
│ + addMarks(id, subject, marks): boolean                         │
│ + getAllStudents(): ArrayList<Student>                          │
│ + generateSummary(): void                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ uses
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Main                                     │
├─────────────────────────────────────────────────────────────────┤
│ - studentManagement: StudentManagement                          │
│ - scanner: Scanner                                              │
├─────────────────────────────────────────────────────────────────┤
│ + main(args): void                                              │
│ - showMenu(): void                                              │
│ - getChoice(): int                                              │
│ - addStudent(): void                                            │
│ - updateStudent(): void                                         │
│ - deleteStudent(): void                                         │
│ - addMarks(): void                                              │
│ - viewReport(): void                                            │
│ - viewSummary(): void                                           │
│ - viewAllStudents(): void                                       │
└─────────────────────────────────────────────────────────────────┘

```

## Relationships:

1. **StudentManagement** manages **Student** objects (One-to-Many)
   - Uses ArrayList to store multiple Student instances
   - Provides operations to manipulate Student objects

2. **Main** uses **StudentManagement** (One-to-One)
   - Main class creates and uses StudentManagement instance
   - Delegates all operations to StudentManagement

3. **Main** uses **Scanner** (One-to-One)
   - Scanner used for user input
   - Used throughout Main class for interactive operations

## Class Responsibilities:

### Student Class
- **Purpose**: Represents a student entity with their academic data
- **Responsibilities**:
  - Store student information (ID, name, course)
  - Store marks for three subjects
  - Calculate average and percentage
  - Determine grade and pass/fail status
  - Display student information

### StudentManagement Class
- **Purpose**: Manages collection of students and business logic
- **Responsibilities**:
  - Store and manage list of students
  - Perform CRUD operations on students
  - Validate and add marks
  - Generate summary reports
  - Handle data operations

### Main Class
- **Purpose**: Application entry point and user interface
- **Responsibilities**:
  - Display menu and interact with user
  - Handle user input and validation
  - Coordinate between user and business logic
  - Format and display output
  - Control application flow

## Design Patterns Used:

1. **Separation of Concerns**: Each class has distinct responsibilities
2. **Single Responsibility Principle**: Each class does one thing well
3. **Encapsulation**: Data is private, accessed through methods
4. **Data Abstraction**: Details hidden, only interface exposed
