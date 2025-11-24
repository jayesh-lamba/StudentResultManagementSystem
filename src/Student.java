/**
 * Student class - represents a student with marks
 * 
 * Created by: Jayesh (22BCE11526)
 * This class stores student information and their marks for three subjects
 * It also contains methods to calculate average, percentage, grade, and pass/fail status
 */
public class Student {
    private String studentId;
    private String name;
    private String course;
    private double mathMarks;
    private double scienceMarks;
    private double englishMarks;
    
    public Student(String studentId, String name, String course) {
        this.studentId = studentId;
        this.name = name;
        this.course = course;
        this.mathMarks = -1;  // -1 means marks not entered yet
        this.scienceMarks = -1;
        this.englishMarks = -1;
    }
    
    // Getters
    public String getStudentId() {
        return studentId;
    }
    
    public String getName() {
        return name;
    }
    
    public String getCourse() {
        return course;
    }
    
    public double getMathMarks() {
        return mathMarks;
    }
    
    public double getScienceMarks() {
        return scienceMarks;
    }
    
    public double getEnglishMarks() {
        return englishMarks;
    }
    
    // Setters
    public void setName(String name) {
        this.name = name;
    }
    
    public void setCourse(String course) {
        this.course = course;
    }
    
    public void setMathMarks(double marks) {
        this.mathMarks = marks;
    }
    
    public void setScienceMarks(double marks) {
        this.scienceMarks = marks;
    }
    
    public void setEnglishMarks(double marks) {
        this.englishMarks = marks;
    }
    
    // Calculate average marks
    // I use -1 to indicate marks not entered yet, so I check for >= 0
    public double calculateAverage() {
        int count = 0;
        double sum = 0;
        
        // Only count subjects where marks have been entered (>= 0)
        if (mathMarks >= 0) {
            sum += mathMarks;
            count++;
        }
        if (scienceMarks >= 0) {
            sum += scienceMarks;
            count++;
        }
        if (englishMarks >= 0) {
            sum += englishMarks;
            count++;
        }
        
        // Avoid division by zero
        if (count == 0) return 0;
        return sum / count;
    }
    
    // Calculate percentage (assuming max marks is 100 for each subject)
    public double calculatePercentage() {
        return calculateAverage();
    }
    
    // Get grade based on percentage
    // Standard grading system used in most institutions
    public String getGrade() {
        double percentage = calculatePercentage();
        if (percentage >= 90) return "A+";
        if (percentage >= 80) return "A";
        if (percentage >= 70) return "B+";
        if (percentage >= 60) return "B";
        if (percentage >= 50) return "C+";
        if (percentage >= 40) return "C";
        return "F"; // Below 40 is fail
    }
    
    // Check if student passed (40% is passing)
    public boolean isPassed() {
        if (mathMarks < 0 || scienceMarks < 0 || englishMarks < 0) {
            return false; // All marks must be entered
        }
        return mathMarks >= 40 && scienceMarks >= 40 && englishMarks >= 40;
    }
    
    // Display student information
    public void displayInfo() {
        System.out.println("\nStudent ID: " + studentId);
        System.out.println("Name: " + name);
        System.out.println("Course: " + course);
        if (mathMarks >= 0) System.out.println("Math: " + mathMarks);
        if (scienceMarks >= 0) System.out.println("Science: " + scienceMarks);
        if (englishMarks >= 0) System.out.println("English: " + englishMarks);
    }
}

