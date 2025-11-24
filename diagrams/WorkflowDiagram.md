# Process Flow / Workflow Diagram

## Main Application Workflow

```
                    START
                      │
                      ▼
        ┌─────────────────────────┐
        │   Display Welcome       │
        │   Message & Menu        │
        └─────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │   Show Main Menu        │
        │   1-8 Options           │
        └─────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │   Get User Choice       │
        └─────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
┌──────────────┐            ┌──────────────┐
│  Choice = 8? │            │ Choice 1-7   │
└──────┬───────┘            └──────┬───────┘
       │                           │
    YES│                        NO │
       │                           │
       ▼                           ▼
┌──────────────┐            ┌──────────────┐
│   Exit       │            │ Execute      │
│   Program    │            │ Selected     │
└──────────────┘            │ Operation    │
                            └──────┬───────┘
                                   │
                                   ▼
                      ┌─────────────────────────┐
                      │   Return to Menu        │
                      │   (Loop Back)           │
                      └─────────────────────────┘
```

## Workflow 1: Add Student Process

```
        START (Option 1)
              │
              ▼
    ┌─────────────────────┐
    │  Prompt for         │
    │  Student ID         │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │  Check if ID        │
    │  Already Exists     │
    └──────────┬──────────┘
               │
        ┌──────┴──────┐
        │             │
      YES            NO
        │             │
        ▼             ▼
┌───────────┐  ┌──────────────┐
│ Show      │  │ Prompt for   │
│ Error     │  │ Name &       │
│ Message   │  │ Course       │
└───────────┘  └──────┬───────┘
                      │
                      ▼
              ┌──────────────┐
              │ Create       │
              │ Student      │
              │ Object       │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ Add to       │
              │ ArrayList    │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ Show Success │
              │ Message      │
              └──────────────┘
                     │
                     ▼
                   END
```

## Workflow 2: Add Marks Process

```
        START (Option 4)
              │
              ▼
    ┌─────────────────────┐
    │  Prompt for         │
    │  Student ID         │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │  Find Student       │
    │  by ID              │
    └──────────┬──────────┘
               │
        ┌──────┴──────┐
        │             │
    NOT FOUND      FOUND
        │             │
        ▼             ▼
┌───────────┐  ┌──────────────┐
│ Show      │  │ Prompt for   │
│ Error     │  │ Subject &    │
│ Message   │  │ Marks        │
└───────────┘  └──────┬───────┘
                      │
                      ▼
              ┌──────────────┐
              │ Validate     │
              │ Marks        │
              │ (0-100)      │
              └──────┬───────┘
                     │
            ┌────────┴────────┐
            │                 │
        INVALID           VALID
            │                 │
            ▼                 ▼
    ┌───────────┐    ┌──────────────┐
    │ Show      │    │ Update       │
    │ Error     │    │ Student      │
    │ Message   │    │ Marks        │
    └───────────┘    └──────┬───────┘
                            │
                            ▼
                    ┌──────────────┐
                    │ Show Success │
                    │ Message      │
                    └──────────────┘
                            │
                            ▼
                          END
```

## Workflow 3: View Student Report Process

```
        START (Option 5)
              │
              ▼
    ┌─────────────────────┐
    │  Prompt for         │
    │  Student ID         │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │  Find Student       │
    └──────────┬──────────┘
               │
        ┌──────┴──────┐
        │             │
    NOT FOUND      FOUND
        │             │
        ▼             ▼
┌───────────┐  ┌──────────────┐
│ Show      │  │ Retrieve     │
│ Error     │  │ Student Data │
│ Message   │  └──────┬───────┘
└───────────┘         │
                      ▼
              ┌──────────────┐
              │ Calculate    │
              │ Average      │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ Calculate    │
              │ Percentage   │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ Determine    │
              │ Grade        │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ Check        │
              │ Pass/Fail    │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ Format &     │
              │ Display      │
              │ Report       │
              └──────────────┘
                     │
                     ▼
                   END
```

## Workflow 4: Generate Summary Process

```
        START (Option 6)
              │
              ▼
    ┌─────────────────────┐
    │  Get All Students   │
    │  from ArrayList     │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │  Check if List      │
    │  is Empty           │
    └──────────┬──────────┘
               │
        ┌──────┴──────┐
        │             │
      EMPTY        NOT EMPTY
        │             │
        ▼             ▼
┌───────────┐  ┌──────────────┐
│ Show      │  │ Loop through │
│ "No       │  │ Each Student │
│ Students" │  └──────┬───────┘
└───────────┘         │
                      ▼
              ┌──────────────┐
              │ For Each     │
              │ Student:     │
              │ - Calculate  │
              │   Average    │
              │ - Get Grade  │
              │ - Check Pass │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ Count        │
              │ Passed/Failed│
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ Format &     │
              │ Display      │
              │ Summary Table│
              └──────────────┘
                     │
                     ▼
                   END
```

## Overall System Flow

```
┌─────────────┐
│ Application │
│   Start     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│         Main Loop                   │
│  ┌───────────────────────────────┐ │
│  │ 1. Display Menu               │ │
│  │ 2. Get User Input             │ │
│  │ 3. Validate Input             │ │
│  │ 4. Execute Selected Operation │ │
│  │ 5. Display Results            │ │
│  │ 6. Wait for Next Input        │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
       │
       │ (Loop continues until Exit)
       │
       ▼
┌─────────────┐
│ Application │
│    Exit     │
└─────────────┘
```

