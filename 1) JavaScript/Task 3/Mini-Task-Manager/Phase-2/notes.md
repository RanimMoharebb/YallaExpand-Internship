# Phase 2 - Classes, this & Prototypes

## New Concepts

### Class

A class is a blueprint used to create objects.

---

### Object

Every call to

new Task(...)

creates a new object.

---

### Constructor

Runs automatically whenever a new object is created.

---

### this

this refers to the object that called the method.

Example:

manager.addTask()

Here

this == manager

---

### Prototype

Methods are NOT copied into every object.

Instead,

Task.prototype

stores

markComplete()

All Task objects share one copy of the function.

---

### Why Classes?

Instead of creating objects manually

{
id,
title
}

we simply write

new Task(...)

---

### Array Methods

push()

Adds tasks.

filter()

Removes tasks.

find()

Finds tasks.

---

### Object.assign()

Updates only the supplied properties.

