# Phase 1 - Closures & Scope

## Concepts Used

### 1. Factory Function

Instead of using a class, createTaskStore() creates and returns an object.

---

### 2. Closures

The returned methods keep access to the private variables.

Private variables:

- tasks
- nextId

Even after createTaskStore() finishes executing, these variables still exist because the returned methods reference them.

---

### 3. Encapsulation

The task list cannot be accessed directly.

This is impossible:

store.tasks

Only the returned methods can modify the data.

---

### 4. Array Methods

push()

Adds a task.

filter()

Removes a task.

find()

Finds a task by id.

---

### 5. Object.assign()

Updates only the provided properties.

Example:

Before:

{
id:1,
title:"JS",
done:false
}

Updates:

{
done:true
}

After:

{
id:1,
title:"JS",
done:true
}

---

### 6. Spread Operator

getTasks() returns

[...tasks]

instead of

tasks

This prevents outside code from modifying the internal array.

