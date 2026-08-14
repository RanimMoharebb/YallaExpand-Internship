# Mini Event-Driven Task Manager

## Overview

This project is a console-based Task Manager developed in four phases to practice fundamental and intermediate JavaScript concepts. The application allows users to create, update, remove, and synchronize tasks while gradually introducing more advanced programming techniques.

Throughout the project, each phase builds on the previous one without modifying earlier implementations, making it easy to understand the evolution of the application.

---

## Project Phases

### Phase 1 – Closures & Encapsulation
- Implemented a task store using a factory function.
- Used closures to create private state.
- Managed tasks through a public API.

### Phase 2 – Classes & Object-Oriented Programming
- Refactored the application using JavaScript classes.
- Created separate `Task` and `TaskManager` classes.
- Learned about constructors, prototypes, and the `this` keyword.

### Phase 3 – Asynchronous Programming
- Simulated a server using Promises.
- Loaded and synchronized tasks using `async/await`.
- Implemented proper error handling with `try...catch`.

### Phase 4 – Debouncing
- Implemented a custom `debounce()` function using closures.
- Prevented multiple rapid save operations from triggering unnecessary API calls.
- Combined all previous concepts into one working application.


---

### Stretch Goal (Optional)

Implemented a simple Publish/Subscribe (Pub/Sub) system inside the `TaskManager`.

The manager can now:

- Register event listeners using `on(eventName, callback)`.
- Notify all subscribers using `emit(eventName, data)`.

Currently supported events:

- `taskAdded`
- `taskRemoved`

This demonstrates the fundamentals of event-driven programming and is similar to the EventEmitter pattern used in Node.js.

---

## JavaScript Concepts Practiced

- Closures
- Lexical Scope
- Encapsulation
- Factory Functions
- Classes
- Objects
- Constructors
- Prototypes
- The `this` keyword
- `bind()`
- Promises
- `async/await`
- Error Handling
- Debounce
- Sequential Asynchronous Execution

---

## How to Run

Navigate to the desired phase and execute its test file.

```bash
cd phase-1
node test.js
```

```bash
cd phase-2
node test.js
```

```bash
cd phase-3
node test.js
```

```bash
cd phase-4
node app.js
```

---

## Most Challenging Concept

The concept that was initially the most confusing was the behavior of the `this` keyword.

At first, I expected `this` to always refer to the object where the method was defined. After experimenting with detached methods, `bind()`, and arrow functions, I understood that the value of `this` depends on **how a function is called**, not where it is declared. This became much clearer while solving the "this trap" exercise in Phase 2.

---

## Project Structure

```
Mini-Event-Driven-Task-Manager/
│
├── phase-1/
├── phase-2/
├── phase-3/
└── phase-4/
```

Each phase is self-contained and preserves the implementation from the previous phase without overwriting it, allowing the project's progression to be reviewed step by step.

---

## Author

Developed as part of the JavaScript assignment on closures, object-oriented programming, asynchronous programming, and event-driven programming.

----------------------------------------

One Important Improvement

Your implementation satisfies the assignment, but if this were a real-world project, I'd make one architectural improvement:

Mini-Event-Driven-Task-Manager/
│
├── phase-1/
├── phase-2/
├── phase-3/
├── phase-4/
│
└── final/
    ├── src/
    │   ├── models/
    │   │   └── Task.js
    │   ├── managers/
    │   │   └── TaskManager.js
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   │   └── debounce.js
    │   └── app.js
    └── README.md

The phase-* folders are excellent for learning because they preserve your progress. A separate final/ folder would hold the clean production-style version after you've finished the assignment.

🎉 Congratulations! By completing these four phases, you've implemented all of the concepts the assignment was designed to teach: closures, encapsulation, classes, this, prototypes, promises, async/await, sequential asynchronous execution, and a custom debounce implementation.


-----------------------

## How to Run

Run each phase from its corresponding folder.

### Phase 1

```bash
cd phase-1
node test.js
```

### Phase 2

```bash
cd phase-2
node test.js
```

### Phase 3

```bash
cd phase-3
node test.js
```

### Phase 4 (Final Application)

```bash
cd phase-4
node app.js
```