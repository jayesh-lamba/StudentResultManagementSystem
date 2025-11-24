import java.util.Scanner;

/**
 * Main class - Student Result Management System
 * 
 * Created by: Jayesh (22BCE11526)
 * This is the main entry point for the application
 * It provides a menu-driven interface for managing student results
 */
public class Main {
    private static StudentManagement studentManagement;
    private static Scanner scanner;
    
    public static void main(String[] args) {
        studentManagement = new StudentManagement();
        scanner = new Scanner(System.in);
        
        System.out.println("========================================");
        System.out.println("  STUDENT RESULT MANAGEMENT SYSTEM");
        System.out.println("========================================");
        
        // Main menu loop - keeps running until user chooses exit
        while (true) {
            showMenu();
            int choice = getChoice();
            
            // Handle user's menu choice
            switch (choice) {
                case 1:
                    addStudent();
                    break;
                case 2:
                    updateStudent();
                    break;
                case 3:
                    deleteStudent();
                    break;
                case 4:
                    addMarks();
                    break;
                case 5:
                    viewReport();
                    break;
                case 6:
                    viewSummary();
                    break;
                case 7:
                    viewAllStudents();
                    break;
                case 8:
                    System.out.println("\nThank you for using Student Result Management System! Goodbye!");
                    scanner.close();
                    return;
                default:
                    System.out.println("\nInvalid choice! Please enter a number between 1-8.");
            }
            
            // Pause before showing menu again
            System.out.println("\nPress Enter to continue...");
            scanner.nextLine();
        }
    }
    
    private static void showMenu() {
        System.out.println("\n========================================");
        System.out.println("              MAIN MENU");
        System.out.println("========================================");
        System.out.println("1. Add Student");
        System.out.println("2. Update Student");
        System.out.println("3. Delete Student");
        System.out.println("4. Add Marks");
        System.out.println("5. View Student Report");
        System.out.println("6. View Pass/Fail Summary");
        System.out.println("7. View All Students");
        System.out.println("8. Exit");
        System.out.println("========================================");
    }
    
    private static int getChoice() {
        System.out.print("Enter your choice (1-8): ");
        try {
            int choice = scanner.nextInt();
            scanner.nextLine(); // consume newline
            return choice;
        } catch (Exception e) {
            scanner.nextLine(); // consume invalid input
            return -1;
        }
    }
    
    private static void addStudent() {
        System.out.println("\n--- Add New Student ---");
        System.out.print("Enter Student ID: ");
        String id = scanner.nextLine();
        
        System.out.print("Enter Student Name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter Course: ");
        String course = scanner.nextLine();
        
        if (studentManagement.addStudent(id, name, course)) {
            System.out.println("Student added successfully!");
        } else {
            System.out.println("Error: Student ID already exists!");
        }
    }
    
    private static void updateStudent() {
        System.out.println("\n--- Update Student ---");
        System.out.print("Enter Student ID: ");
        String id = scanner.nextLine();
        
        Student student = studentManagement.findStudent(id);
        if (student == null) {
            System.out.println("Error: Student not found!");
            return;
        }
        
        System.out.println("\nCurrent Details:");
        student.displayInfo();
        
        System.out.println("\n1. Update Name");
        System.out.println("2. Update Course");
        System.out.print("What do you want to update (1 or 2): ");
        
        int choice = getChoice();
        if (choice == 1) {
            System.out.print("Enter new name: ");
            String newName = scanner.nextLine();
            if (studentManagement.updateStudentName(id, newName)) {
                System.out.println("Name updated successfully!");
            }
        } else if (choice == 2) {
            System.out.print("Enter new course: ");
            String newCourse = scanner.nextLine();
            if (studentManagement.updateStudentCourse(id, newCourse)) {
                System.out.println("Course updated successfully!");
            }
        } else {
            System.out.println("Invalid choice!");
        }
    }
    
    private static void deleteStudent() {
        System.out.println("\n--- Delete Student ---");
        System.out.print("Enter Student ID: ");
        String id = scanner.nextLine();
        
        Student student = studentManagement.findStudent(id);
        if (student == null) {
            System.out.println("Error: Student not found!");
            return;
        }
        
        System.out.println("\nStudent to be deleted:");
        student.displayInfo();
        System.out.print("\nAre you sure? (yes/no): ");
        String confirm = scanner.nextLine();
        
        if (confirm.equalsIgnoreCase("yes")) {
            if (studentManagement.deleteStudent(id)) {
                System.out.println("Student deleted successfully!");
            }
        } else {
            System.out.println("Deletion cancelled.");
        }
    }
    
    private static void addMarks() {
        System.out.println("\n--- Add Marks ---");
        System.out.print("Enter Student ID: ");
        String id = scanner.nextLine();
        
        Student student = studentManagement.findStudent(id);
        if (student == null) {
            System.out.println("Error: Student not found!");
            return;
        }
        
        System.out.println("\nSubjects: Math, Science, English");
        System.out.print("Enter Subject: ");
        String subject = scanner.nextLine();
        
        System.out.print("Enter Marks (0-100): ");
        try {
            double marks = scanner.nextDouble();
            scanner.nextLine(); // consume newline
            
            if (studentManagement.addMarks(id, subject, marks)) {
                System.out.println("Marks added successfully!");
            } else {
                System.out.println("Error: Invalid marks or subject!");
            }
        } catch (Exception e) {
            System.out.println("Error: Invalid input!");
            scanner.nextLine();
        }
    }
    
    private static void viewReport() {
        System.out.println("\n--- Student Report ---");
        System.out.print("Enter Student ID: ");
        String id = scanner.nextLine();
        
        Student student = studentManagement.findStudent(id);
        if (student == null) {
            System.out.println("Error: Student not found!");
            return;
        }
        
        System.out.println("\n========================================");
        System.out.println("        STUDENT RESULT REPORT");
        System.out.println("========================================");
        System.out.println("Student ID: " + student.getStudentId());
        System.out.println("Name: " + student.getName());
        System.out.println("Course: " + student.getCourse());
        System.out.println("----------------------------------------");
        
        if (student.getMathMarks() >= 0) {
            System.out.println("Math: " + student.getMathMarks());
        }
        if (student.getScienceMarks() >= 0) {
            System.out.println("Science: " + student.getScienceMarks());
        }
        if (student.getEnglishMarks() >= 0) {
            System.out.println("English: " + student.getEnglishMarks());
        }
        
        System.out.println("----------------------------------------");
        double avg = student.calculateAverage();
        String grade = student.getGrade();
        String status = student.isPassed() ? "PASSED" : "FAILED";
        
        System.out.println("Average: " + String.format("%.2f", avg));
        System.out.println("Grade: " + grade);
        System.out.println("Status: " + status);
        System.out.println("========================================");
    }
    
    private static void viewSummary() {
        studentManagement.generateSummary();
    }
    
    private static void viewAllStudents() {
        System.out.println("\n--- All Students ---");
        System.out.println("========================================");
        
        if (studentManagement.getAllStudents().isEmpty()) {
            System.out.println("No students found!");
            return;
        }
        
        System.out.printf("%-12s %-20s %-15s\n", "Student ID", "Name", "Course");
        System.out.println("----------------------------------------");
        
        for (Student student : studentManagement.getAllStudents()) {
            System.out.printf("%-12s %-20s %-15s\n",
                student.getStudentId(),
                student.getName(),
                student.getCourse());
        }
        
        System.out.println("========================================");
        System.out.println("Total: " + studentManagement.getAllStudents().size() + " students");
    }
}

