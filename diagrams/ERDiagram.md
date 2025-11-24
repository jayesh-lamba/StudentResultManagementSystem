# Entity Relationship Diagram - Student Result Management System

```
┌─────────────────────────────────────────────────────────────────┐
│                         STUDENT                                  │
├─────────────────────────────────────────────────────────────────┤
│ PK │ student_id        │ VARCHAR(20)     │ NOT NULL, UNIQUE     │
│    │ name              │ VARCHAR(100)    │ NOT NULL             │
│    │ course            │ VARCHAR(50)     │ NOT NULL             │
└─────────────────────────────────────────────────────────────────┘
                           │
                           │
                           │ One-to-Many (1:N)
                           │
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                          MARKS                                   │
├─────────────────────────────────────────────────────────────────┤
│ PK │ marks_id          │ INT             │ AUTO_INCREMENT       │
│ FK │ student_id        │ VARCHAR(20)     │ NOT NULL             │
│    │ subject           │ VARCHAR(50)     │ NOT NULL             │
│    │ marks_obtained    │ DECIMAL(5,2)    │ NOT NULL, >= 0       │
│    │ max_marks         │ DECIMAL(5,2)    │ NOT NULL, > 0        │
│    │ percentage        │ DECIMAL(5,2)    │ CALCULATED           │
│    │ grade             │ VARCHAR(2)      │ CALCULATED           │
│    │ created_date      │ TIMESTAMP       │ DEFAULT CURRENT_TIME │
│    │ updated_date      │ TIMESTAMP       │ ON UPDATE CURRENT_TIME│
└─────────────────────────────────────────────────────────────────┘

```

## Relationship Details:

### STUDENT ────────< MARKS
- **Relationship Type**: One-to-Many (1:N)
- **Cardinality**: One student can have many marks (for different subjects)
- **Foreign Key**: `marks.student_id` references `student.student_id`
- **Constraint**: ON DELETE CASCADE (if student is deleted, all marks are deleted)

## Database Schema (SQL):

```sql
-- Student Table
CREATE TABLE student (
    student_id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    course VARCHAR(50) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Marks Table
CREATE TABLE marks (
    marks_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    marks_obtained DECIMAL(5,2) NOT NULL CHECK (marks_obtained >= 0),
    max_marks DECIMAL(5,2) NOT NULL CHECK (max_marks > 0),
    percentage DECIMAL(5,2) AS ((marks_obtained / max_marks) * 100) STORED,
    grade VARCHAR(2) AS (
        CASE 
            WHEN ((marks_obtained / max_marks) * 100) >= 90 THEN 'A+'
            WHEN ((marks_obtained / max_marks) * 100) >= 80 THEN 'A'
            WHEN ((marks_obtained / max_marks) * 100) >= 70 THEN 'B+'
            WHEN ((marks_obtained / max_marks) * 100) >= 60 THEN 'B'
            WHEN ((marks_obtained / max_marks) * 100) >= 50 THEN 'C+'
            WHEN ((marks_obtained / max_marks) * 100) >= 40 THEN 'C'
            ELSE 'F'
        END
    ) STORED,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_subject (student_id, subject),
    CHECK (marks_obtained <= max_marks)
);

-- Indexes for better performance
CREATE INDEX idx_student_course ON student(course);
CREATE INDEX idx_marks_student ON marks(student_id);
CREATE INDEX idx_marks_subject ON marks(subject);
```

## Attributes Description:

### STUDENT Table:
- **student_id** (PK): Unique identifier for each student
- **name**: Full name of the student
- **course**: Course/program the student is enrolled in

### MARKS Table:
- **marks_id** (PK): Unique identifier for each marks record
- **student_id** (FK): References student table
- **subject**: Name of the subject
- **marks_obtained**: Marks scored by the student
- **max_marks**: Maximum marks for the subject
- **percentage**: Calculated percentage (computed column)
- **grade**: Letter grade based on percentage (computed column)
- **created_date**: Timestamp when record was created
- **updated_date**: Timestamp when record was last updated

## Constraints:
1. **Primary Keys**: student_id (Student), marks_id (Marks)
2. **Foreign Key**: marks.student_id → student.student_id
3. **Unique Constraint**: (student_id, subject) - prevents duplicate subject entries for same student
4. **Check Constraints**: 
   - marks_obtained >= 0
   - max_marks > 0
   - marks_obtained <= max_marks
5. **Cascade Delete**: Deleting a student will automatically delete all their marks

