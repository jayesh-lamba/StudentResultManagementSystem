# Use Case Diagram - Student Result Management System

```
                    Student Result Management System
    ┌─────────────────────────────────────────────────────────────┐
    │                                                             │
    │  ┌──────────────────────────────────────────────────────┐  │
    │  │                     Admin                             │  │
    │  └──────────────────────────────────────────────────────┘  │
    │                        │                                    │
    │                        │                                    │
    │  ┌──────────────────────────────────────────────────────┐  │
    │  │                   Student                             │  │
    │  └──────────────────────────────────────────────────────┘  │
    │                        │                                    │
    └────────────────────────┼────────────────────────────────────┘
                             │
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        │                    │                    │
    ┌───▼────┐         ┌─────▼─────┐      ┌──────▼──────┐
    │ Manage │         │ Enter     │      │ View        │
    │Student │         │ Marks     │      │ Results     │
    └────────┘         └───────────┘      └─────────────┘
         │                  │                    │
         │                  │                    │
    ┌────▼────┐       ┌─────▼──────┐      ┌─────▼──────┐
    │ Add     │       │ Add Marks  │      │ Individual │
    │ Update  │       │ Update     │      │ Report     │
    │ Delete  │       │ Validate   │      │ Pass/Fail  │
    └─────────┘       └────────────┘      │ Summary    │
                                          └────────────┘

```

## Use Cases

### Admin Use Cases:
1. **Add Student** - Add new student to the system
2. **Update Student** - Modify student information (name, course)
3. **Delete Student** - Remove student from the system
4. **Enter Marks** - Add marks for subjects
5. **Update Marks** - Modify existing marks
6. **View Results** - View individual and summary reports

### Student Use Cases:
1. **View Results** - View their own result report
2. **View Summary** - View pass/fail summary of all students

