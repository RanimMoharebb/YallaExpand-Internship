# Phase 4 Notes

## Overview

In the final phase, all previous phases were combined into one working Node.js application. A custom `debounce()` function was implemented to prevent multiple rapid API calls, and an optional Publish/Subscribe (Pub/Sub) event system was added to make the application more event-driven.

---

# Debounce

Debounce is a technique that delays the execution of a function until a specified amount of time has passed without the function being called again.

It is useful for reducing unnecessary operations that may occur repeatedly in a short period of time.

Example:

Without debounce:

```
User Types:

A
AB
ABC
ABCD

↓

Search
Search
Search
Search
```

With debounce:

```
User Types:

A
AB
ABC
ABCD

↓

(wait 500 ms)

↓

Search ABCD
```

Only the final action is executed.

---

# How Debounce Works

The debounce function stores a timer.

Each time the returned function is called:

1. The previous timer is cancelled.
2. A new timer starts.
3. If another call happens before the timer finishes, the timer is reset.
4. The original function executes only after the calls stop for the specified delay.

Example implementation:

```javascript
function debounce(fn, delay) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            fn(...args);

        }, delay);

    };

}
```

---

# Closures

The debounce implementation works because of **closures**.

The returned function remembers the `timer` variable even after `debounce()` has finished executing.

```
debounce()
    │
    └── timer
          ▲
          │
Returned Function
```

Without closures, each function call would create a new timer and debouncing would not work correctly.

---

# Event-Driven Programming

Instead of components communicating directly, they communicate through events.

In the optional Stretch Goal, the `TaskManager` publishes events whenever a task is added or removed.

Example:

```javascript
manager.on("taskAdded", callback);
manager.emit("taskAdded", task);
```

Workflow:

```
Task Added
     │
     ▼
emit("taskAdded")
     │
     ▼
Registered Callbacks Execute
```

This is known as the **Publish/Subscribe (Pub/Sub)** pattern.

---

# Publish/Subscribe (Pub/Sub)

The Pub/Sub pattern separates the code that generates events from the code that responds to them.

Publisher:

```
TaskManager
```

Subscribers:

```
Logger

Notification System

Analytics
```

The publisher does not know who is listening.

It simply emits an event.

This makes the application easier to extend and maintain.

---

# Debounce Test

Example:

```javascript
for (let i = 0; i < 10; i++) {
    debouncedSave(task);
}
```

Although `debouncedSave()` is called ten times, only one API request is sent after the delay expires.

Expected behavior:

```
Calling save rapidly...

Waiting for debounce...

Saved: Learn Pub/Sub
```

This proves that debounce successfully prevents multiple unnecessary save operations.

---

# Final Application Flow

```
Application Starts
        │
        ▼
Load Tasks
        │
        ▼
Register Event Listeners
        │
        ▼
Add Task
        │
        ▼
Emit "taskAdded"
        │
        ▼
Rapid Save Requests
        │
        ▼
Debounce Delays Execution
        │
        ▼
Single Save Request
        │
        ▼
Remove Task
        │
        ▼
Emit "taskRemoved"
        │
        ▼
Application Ends
```

---

# Key Concepts Learned

- Debounce
- Closures
- Event-Driven Programming
- Publish/Subscribe (Pub/Sub)
- Event Listeners
- Custom Utility Functions
- Delayed Execution
- API Call Optimization
- Combining Multiple JavaScript Concepts into a Complete Application