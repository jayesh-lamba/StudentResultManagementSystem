# System Architecture Diagram

## High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface Layer                      │
│                      (Console Interface)                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                 Main.java                            │  │
│  │  - Menu Display                                      │  │
│  │  - User Input Handling                               │  │
│  │  - Input Validation                                  │  │
│  │  - Output Formatting                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ calls
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Business Logic Layer                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           StudentManagement.java                      │  │
│  │  - Student CRUD Operations                           │  │
│  │  - Marks Management                                  │  │
│  │  - Result Processing                                 │  │
│  │  - Report Generation                                 │  │
│  │  - Data Validation                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ uses
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Model Layer                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Student.java                         │  │
│  │  - Student Attributes                                │  │
│  │  - Marks Storage                                     │  │
│  │  - Calculation Methods                               │  │
│  │  - Grade Determination                               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ stored in
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Storage Layer                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ArrayList<Student>                       │  │
│  │  - In-Memory Storage                                  │  │
│  │  - Dynamic Array Collection                          │  │
│  │  - Runtime Data Storage                              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Architecture Layers Description

### 1. User Interface Layer
- **Component:** Main.java
- **Responsibility:**
  - Display menus and prompts
  - Accept user input
  - Format and display output
  - Handle user interactions
- **Technology:** Java Scanner for input/output

### 2. Business Logic Layer
- **Component:** StudentManagement.java
- **Responsibility:**
  - Implement all business rules
  - Manage student operations (CRUD)
  - Process marks and calculate results
  - Generate reports
  - Validate data
- **Technology:** Java Collections (ArrayList)

### 3. Data Model Layer
- **Component:** Student.java
- **Responsibility:**
  - Define student entity structure
  - Store student data
  - Provide calculation methods
  - Encapsulate student behavior
- **Technology:** Java Classes and Objects

### 4. Data Storage Layer
- **Component:** ArrayList Collection
- **Responsibility:**
  - Store student objects
  - Provide access to stored data
  - Manage data lifecycle
- **Technology:** Java Collections Framework
- **Note:** Currently in-memory storage (data lost on exit)

## Component Interaction Flow

```
User Input → Main.java → StudentManagement.java → Student.java → ArrayList
                │                │                     │             │
                │                │                     │             │
Output ←────────┴────────────────┴─────────────────────┴─────────────┘
```

## Data Flow

1. **Input Flow:**
   - User enters data through console
   - Main.java receives input via Scanner
   - Main.java passes data to StudentManagement
   - StudentManagement creates/updates Student objects
   - Student objects stored in ArrayList

2. **Processing Flow:**
   - StudentManagement retrieves Student from ArrayList
   - Business logic applied (validation, calculations)
   - Student methods called for calculations
   - Results returned to StudentManagement

3. **Output Flow:**
   - StudentManagement formats data for reports
   - Main.java receives formatted strings
   - Main.java displays output to console
   - User sees results

## Architecture Characteristics

- **Layer Separation:** Clear separation of concerns
- **Modularity:** Each layer has specific responsibilities
- **Maintainability:** Changes in one layer don't affect others easily
- **Scalability:** Easy to extend with new features
- **Simplicity:** Suitable for basic Java course requirements

