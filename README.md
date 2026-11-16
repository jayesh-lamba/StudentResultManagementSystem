# Student Result Management System

## Project Title
Student Result Management System - A Console-Based Java Application

## 📋 Overview

This project is a **Student Result Management System** developed as part of the VIT flipped course evaluation. It is a console-based Java application designed to efficiently manage student information, academic marks, and generate comprehensive result reports. The system automates result calculation, grade assignment, and provides quick access to student performance data.

The project demonstrates practical application of core Java concepts including Object-Oriented Programming, Collections Framework, Input/Output handling, and basic algorithms for data processing.

## ✨ Features

### Functional Modules

1. **Student Management Module**
   - Add new students with unique IDs
   - Update student information (name, course)
   - Delete student records
   - View all registered students

2. **Marks Management Module**
   - Enter marks for three subjects (Math, Science, English)
   - Update existing marks
   - Input validation (marks range 0-100)
   - Handle missing marks appropriately

3. **Result Processing & Reporting Module**
   - Automatic calculation of average marks
   - Automatic percentage calculation
   - Grade assignment (A+, A, B+, B, C+, C, F)
   - Pass/Fail determination
   - Individual student reports
   - Pass/Fail summary for all students

### Non-Functional Requirements

1. **Usability**
   - Simple menu-driven interface
   - Clear prompts and instructions
   - User-friendly error messages
   - Formatted output for better readability

2. **Performance**
   - Efficient data storage using ArrayList
   - Fast retrieval and processing
   - Minimal memory footprint
   - Quick response time for all operations

3. **Error Handling**
   - Input validation for marks (0-100 range)
   - Duplicate student ID prevention
   - Handling of missing student records
   - Invalid input handling with user feedback

4. **Maintainability**
   - Clean, modular code structure
   - Well-documented code with comments
   - Separation of concerns (classes for different functionalities)
   - Easy to extend and modify

5. **Reliability**
   - Consistent behavior across all operations
   - Data integrity through validation
   - Proper exception handling
   - Stable execution without crashes

## 🛠 Technologies/Tools Used

- **Programming Language:** Java (Core Java - JDK 8 or higher)
- **Collections:** ArrayList (java.util.ArrayList)
- **Input/Output:** Scanner (java.util.Scanner)
- **Development Environment:** Any Java IDE or text editor
- **Version Control:** Git & GitHub
- **Operating System:** Cross-platform (Windows, Linux, macOS)

**Dependencies:** None (Pure Java - no external libraries required)

## 📁 Project Structure

```
StudentResultManagementSystem/
│
├── src/
│   ├── Student.java              # Student entity class
│   ├── StudentManagement.java    # Business logic and data management
│   └── Main.java                 # Application entry point
│
├── diagrams/
│   ├── UseCaseDiagram.md         # Use case diagram
│   ├── ClassDiagram.md           # Class diagram
│   ├── SequenceDiagram.md        # Sequence diagrams
│   ├── ERDiagram.md              # Entity relationship diagram
│   ├── SystemArchitecture.md     # System architecture
│   └── WorkflowDiagram.md        # Process flow diagram
│
├── statement.md                  # Problem statement and scope
├── README.md                     # This file
├── QUICK_START.md                # Quick reference guide
├── PROJECT_REPORT.md             # Detailed project report
├── compile.bat                   # Windows compilation script
├── run.bat                       # Windows run script
└── build_and_run.bat             # Build and run script
```

## 🚀 Installation & Setup

### Prerequisites

- **Java Development Kit (JDK)** version 8 or higher
  - Download from: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://openjdk.org/)
  - Verify installation: `java -version` and `javac -version`

- **Text Editor or IDE** (optional but recommended)
  - Eclipse IDE
  - IntelliJ IDEA
  - NetBeans
  - VS Code with Java extensions
  - Any text editor

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jayesh-lamba/StudentResultManagementSystem.git
   cd StudentResultManagementSystem
   ```

2. **Verify Java Installation**
   ```bash
   java -version
   javac -version
   ```

3. **Navigate to Project Directory**
   ```bash
   cd StudentResultManagementSystem
   ```

## 🔧 Steps to Run the Project

### Method 1: Using Command Line (Recommended)

1. **Compile the Java files:**
   ```bash
   javac src\*.java
   ```
   Or if in `src` directory:
   ```bash
   cd src
   javac *.java
   ```

2. **Run the application:**
   ```bash
   java -cp src Main
   ```
   Or if in `src` directory:
   ```bash
   java Main
   ```

### Method 2: Using Batch Scripts (Windows)

1. **Double-click `build_and_run.bat`** - This will compile and run the application automatically

   OR

2. **Compile separately:**
   - Double-click `compile.bat`
   - Then double-click `run.bat`

### Method 3: Using IDE

1. Open the project in your IDE (Eclipse/IntelliJ/NetBeans)
2. Import the `src` folder as source directory
3. Run `Main.java` as Java Application

## 📖 Instructions for Testing

### Test Case 1: Add Student
1. Run the program
2. Select option `1` (Add Student)
3. Enter:
   - Student ID: `S001`
   - Name: `John Doe`
   - Course: `Computer Science`
4. **Expected:** Success message displayed

### Test Case 2: Add Marks
1. Select option `4` (Add Marks)
2. Enter:
   - Student ID: `S001`
   - Subject: `Math`
   - Marks: `85`
3. Repeat for Science (`78`) and English (`92`)
4. **Expected:** Marks added successfully

### Test Case 3: View Student Report
1. Select option `5` (View Student Report)
2. Enter Student ID: `S001`
3. **Expected:** Detailed report showing:
   - Student information
   - Subject-wise marks
   - Average: 85.00
   - Grade: A
   - Status: PASSED

### Test Case 4: View Summary
1. Add 2-3 more students with marks
2. Select option `6` (View Pass/Fail Summary)
3. **Expected:** Summary table showing all students with their results

### Test Case 5: Input Validation
1. Select option `4` (Add Marks)
2. Enter marks: `150` or `-10`
3. **Expected:** Error message for invalid marks

### Test Case 6: Update Student
1. Select option `2` (Update Student)
2. Enter existing Student ID
3. Update name or course
4. **Expected:** Updated successfully

### Test Case 7: Delete Student
1. Select option `3` (Delete Student)
2. Enter Student ID
3. Confirm with `yes`
4. **Expected:** Student deleted

## 📸 Screenshots

### Main Menu
```
========================================
  STUDENT RESULT MANAGEMENT SYSTEM
========================================

========================================
              MAIN MENU
========================================
1. Add Student
2. Update Student
3. Delete Student
4. Add Marks
5. View Student Report
6. View Pass/Fail Summary
7. View All Students
8. Exit
========================================
```

### Sample Output - Student Report
```
========================================
        STUDENT RESULT REPORT
========================================
Student ID: S001
Name: John Doe
Course: Computer Science
----------------------------------------
Math: 85.0
Science: 78.0
English: 92.0
----------------------------------------
Average: 85.00
Grade: A
Status: PASSED
========================================
```

## 📊 Class Structure

### Student.java
- **Purpose:** Represents a student entity
- **Attributes:** studentId, name, course, marks for 3 subjects
- **Methods:** Getters, setters, calculateAverage(), calculatePercentage(), getGrade(), isPassed()

### StudentManagement.java
- **Purpose:** Manages all student operations
- **Attributes:** ArrayList<Student> students
- **Methods:** addStudent(), findStudent(), updateStudent(), deleteStudent(), addMarks(), getAllStudents(), generateSummary()

### Main.java
- **Purpose:** Application entry point and user interface
- **Methods:** main(), showMenu(), and various handler methods for each menu option

## 🎓 Learning Concepts Demonstrated

- ✅ Object-Oriented Programming (Classes, Objects, Encapsulation)
- ✅ Java Collections (ArrayList)
- ✅ Input/Output handling (Scanner)
- ✅ Control Structures (if-else, switch-case, loops)
- ✅ Method creation and calling
- ✅ Data validation and error handling
- ✅ Basic algorithms (average calculation, grade assignment)
- ✅ Code organization and modularity

## 📝 Key Specifications

- **Marks Range:** 0-100 for each subject
- **Subjects:** Math, Science, English (fixed)
- **Passing Percentage:** 40%
- **Grade System:**
  - A+ : 90% and above
  - A  : 80% to 89%
  - B+ : 70% to 79%
  - B  : 60% to 69%
  - C+ : 50% to 59%
  - C  : 40% to 49%
  - F  : Below 40%

## 🔄 Version Control

This project uses Git for version control. The repository includes:
- Complete source code
- Documentation files
- Design diagrams
- README and project report

## 👥 Author

**Jayesh**  
**Registration Number:** 22BCE11526  
**Institution:** VIT (Vellore Institute of Technology)

Developed as part of VIT Flipped Course Evaluation

## 📄 License

Educational Project - For Academic Purposes Only

## 📚 Additional Documentation

- See `statement.md` for detailed problem statement and scope
- See `PROJECT_REPORT.md` for comprehensive project report
- See `diagrams/` folder for all design diagrams
- See `QUICK_START.md` for quick reference guide

---

**Note:** This is a console-based application. Data is stored in memory and will be lost when the program exits. For persistent storage, database integration would be required (future enhancement).
