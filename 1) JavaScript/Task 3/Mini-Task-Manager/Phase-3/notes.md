# Phase 3 Notes

## Overview

In this phase, the application was extended to support asynchronous programming. Instead of interacting with a real server, a fake API was created using Promises and `setTimeout()`. The application loads tasks, synchronizes tasks, and handles possible failures using `async/await`.

---

# Promise

A **Promise** represents the result of an asynchronous operation that will complete in the future.

A Promise has three possible states:

```
Pending
   │
   ├──► Fulfilled (Success)
   │
   └──► Rejected (Failure)
```

Example:

```javascript
const promise = fetchTasksFromServer();
```

The Promise starts in the **Pending** state and eventually becomes either **Fulfilled** or **Rejected**.

---

# async

The `async` keyword makes a function automatically return a Promise.

Example:

```javascript
async function loadTasks() {
    return [];
}
```

is equivalent to:

```javascript
function loadTasks() {
    return Promise.resolve([]);
}
```

---

# await

The `await` keyword pauses the execution of an async function until a Promise finishes.

Example:

```javascript
const tasks = await fetchTasksFromServer();
```

Execution waits until the Promise resolves before moving to the next line.

`await` can only be used inside an `async` function.

---

# try...catch

`try...catch` is used to handle rejected Promises when using `async/await`.

Example:

```javascript
try {
    const tasks = await fetchTasksFromServer();
    console.log(tasks);
}
catch (error) {
    console.log(error.message);
}
```

Without `try...catch`, an unhandled Promise rejection may terminate the program.

---

# Fake API

The project simulates communication with a server.

### fetchTasksFromServer()

- Returns a list of tasks.
- Resolves after approximately **1 second**.

### saveTaskToServer(task)

- Simulates saving a task.
- Resolves after approximately **300 ms**.
- Randomly fails **20%** of the time to practice error handling.

---

# Sequential Execution

Using `for...of` together with `await` executes asynchronous operations one after another.

Example:

```javascript
for (const task of tasks) {
    await saveTaskToServer(task);
}
```

Execution order:

```
Task 1
   ↓
Task 2
   ↓
Task 3
```

The next task does not begin until the previous one has finished.

---

# Parallel Execution

Using `Promise.all()` starts all asynchronous operations at the same time.

Example:

```javascript
await Promise.all(
    tasks.map(task => saveTaskToServer(task))
);
```

Execution:

```
Task 1 ──┐
Task 2 ──┼──► Running together
Task 3 ──┘
```

This is useful when the order of execution does not matter.

---

# .then() vs async/await

## Promise Chaining

```javascript
fetchTasksFromServer()
    .then(tasks => {
        console.log(tasks);
    })
    .catch(error => {
        console.log(error.message);
    });
```

## async/await

```javascript
try {
    const tasks = await fetchTasksFromServer();
    console.log(tasks);
}
catch (error) {
    console.log(error.message);
}
```

### Comparison

| `.then()` | `async/await` |
|------------|---------------|
| Uses callback chaining | Looks like synchronous code |
| Can become harder to read with multiple async operations | Easier to read and maintain |
| Handles errors with `.catch()` | Handles errors with `try...catch` |

---

# Why `forEach(async ...)` Does Not Work

Incorrect approach:

```javascript
tasks.forEach(async (task) => {

    await saveTaskToServer(task);

    console.log(task.title);

});
```

The `forEach()` method does **not wait** for asynchronous callbacks to finish.

Instead, it starts every callback immediately.

Example:

```
Start Task 1
Start Task 2
Start Task 3
Start Task 4
Start Task 5
```

The completion order depends on timing and is not guaranteed.

---

# Correct Sequential Solution

```javascript
for (const task of tasks) {

    await saveTaskToServer(task);

    console.log(task.title);

}
```

Execution becomes:

```
Save Task 1
     ↓
Save Task 2
     ↓
Save Task 3
     ↓
Save Task 4
     ↓
Save Task 5
```

Each iteration waits for the previous save operation to complete before continuing.

---

# Key Concepts Learned

- Promise
- Promise States (Pending, Fulfilled, Rejected)
- Fake APIs
- Asynchronous Programming
- async
- await
- try...catch
- Sequential Execution
- Parallel Execution
- `.then()` vs `async/await`
- Why `forEach(async ...)` is not suitable for sequential asynchronous operations