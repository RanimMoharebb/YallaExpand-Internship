# Phase 3 Deliverables

## 1. Async/Await Version for Loading Tasks

The application loads tasks when it starts by calling the asynchronous `loadTasks()` function.

```javascript
await manager.loadTasks();
```

The `loadTasks()` function waits for the fake API to return the task list before continuing execution.

---

## 2. syncTask() with Error Handling

```javascript
async syncTask(task) {
    try {
        const saved = await saveTaskToServer(task);
        console.log("Saved:", saved.title);
        return saved;
    }
    catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}
```

The function uses `try...catch` to handle rejected Promises without crashing the application.

---

## 3. Why `forEach()` Does Not Work with Async Callbacks

### Given Code

```javascript
tasks.forEach(async (task) => {

    await saveTaskToServer(task);

    console.log(task.title);

});
```

### Why It Doesn't Work

`forEach()` does not wait for asynchronous callbacks to finish.

Each callback starts immediately, so all save operations execute concurrently.

As a result:

- The tasks may finish in a different order.
- The loop itself finishes before the save operations complete.
- It is impossible to use `await` to pause the entire `forEach()` loop.

---

### Correct Sequential Version

```javascript
for (const task of tasks) {

    await saveTaskToServer(task);

    console.log(task.title);

}
```

Using `for...of` with `await` executes each save operation one after another.

The next iteration does not start until the current Promise has finished.

This guarantees sequential execution and preserves the order of operations.

---

## Key Concepts Learned

- Promise
- async / await
- try / catch
- Sequential execution
- Parallel execution
- Why `forEach()` is not suitable for sequential asynchronous operations


-------------------------------------------

