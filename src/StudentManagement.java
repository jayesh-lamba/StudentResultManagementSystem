import java.util.ArrayList;

/**
 * StudentManagement class - handles all student operations
 * 
 * Created by: Jayesh (22BCE11526)
 * This class manages the list of students and provides methods for
 * CRUD operations (Create, Read, Update, Delete) and result processing
 */
public class StudentManagement {
    private ArrayList<Student> students;
    
    public StudentManagement() {
        students = new ArrayList<>();
    }
    
    // Add new student
    // Returns false if student ID already exists (to prevent duplicates)
    public boolean addStudent(String studentId, String name, String course) {
        // Check if student ID already exists - don't want duplicates
        if (findStudent(studentId) != null) {
            return false;
        }
        Student student = new Student(studentId, name, course);
        students.add(student);
        return true;
    }
    
    // Find student by ID
    public Student findStudent(String studentId) {
        for (Student student : students) {
            if (student.getStudentId().equals(studentId)) {
                return student;
            }
        }
        return null;
    }
    
    // Update student name
    public boolean updateStudentName(String studentId, String newName) {
        Student student = findStudent(studentId);
        if (student != null) {
            student.setName(newName);
            return true;
        }
        return false;
    }
    
    // Update student course
    public boolean updateStudentCourse(String studentId, String newCourse) {
        Student student = findStudent(studentId);
        if (student != null) {
            student.setCourse(newCourse);
            return true;
        }
        return false;
    }
    
    // Delete student
    public boolean deleteStudent(String studentId) {
        Student student = findStudent(studentId);
        if (student != null) {
            students.remove(student);
            return true;
        }
        return false;
    }
    
    // Add marks for a subject
    // Validates that marks are between 0 and 100 (standard marking)
    public boolean addMarks(String studentId, String subject, double marks) {
        Student student = findStudent(studentId);
        if (student == null) {
            return false; // Student doesn't exist
        }
        
        // Validate marks - should be between 0 and 100
        // This prevents invalid entries like negative marks or marks over 100
        if (marks < 0 || marks > 100) {
            return false;
        }
        
        // Set marks based on subject (case-insensitive matching)
        if (subject.equalsIgnoreCase("math")) {
            student.setMathMarks(marks);
            return true;
        } else if (subject.equalsIgnoreCase("science")) {
            student.setScienceMarks(marks);
            return true;
        } else if (subject.equalsIgnoreCase("english")) {
            student.setEnglishMarks(marks);
            return true;
        }
        return false; // Invalid subject name
    }
    
    // Get all students
    public ArrayList<Student> getAllStudents() {
        return students;
    }
    
    // Generate pass/fail summary
    public void generateSummary() {
        if (students.isEmpty()) {
            System.out.println("\nNo students found!");
            return;
        }
        
        System.out.println("\n========================================");
        System.out.println("         PASS/FAIL SUMMARY");
        System.out.println("========================================");
        System.out.printf("%-12s %-20s %-15s %8s %8s %8s\n", 
            "Student ID", "Name", "Course", "Average", "Grade", "Status");
        System.out.println("----------------------------------------");
        
        int passed = 0;
        int failed = 0;
        
        for (Student student : students) {
            double avg = student.calculateAverage();
            String grade = student.getGrade();
            String status = student.isPassed() ? "PASS" : "FAIL";
            
            if (student.isPassed()) {
                passed++;
            } else {
                failed++;
            }
            
            System.out.printf("%-12s %-20s %-15s %8.2f %8s %8s\n",
                student.getStudentId(),
                student.getName(),
                student.getCourse(),
                avg,
                grade,
                status);
        }
        
        System.out.println("----------------------------------------");
        System.out.println("Total Students: " + students.size());
        System.out.println("Passed: " + passed);
        System.out.println("Failed: " + failed);
        System.out.println("========================================");
    }
}

