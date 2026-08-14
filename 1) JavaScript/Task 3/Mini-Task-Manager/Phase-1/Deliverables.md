# Bug Exercise

## Given Code

```javascript
function addManyTasks(store, titles) {
    for (var i = 0; i < titles.length; i++) {
        setTimeout(() => {
            store.addTask({ title: titles[i] });
        }, 100);
    }
}
```

---

## Why Does It Fail?

The bug occurs because `var` is **function-scoped**, meaning there is only one shared variable `i` for the entire loop.

The `setTimeout()` callback is asynchronous, so it does not execute immediately. Instead, the loop finishes first, and by the time the callbacks execute, the value of `i` has already become `titles.length`.

As a result, every callback tries to access:

```javascript
titles[i]
```

which is equivalent to:

```javascript
titles[titles.length]
```

Since this index is outside the array bounds, the value is `undefined`, so all tasks are created with an undefined title.

---

## Example

```javascript
const titles = ["HTML", "CSS", "JavaScript"];
```

After the loop finishes:

```javascript
i = 3;
```

Each callback executes:

```javascript
store.addTask({
    title: titles[3]
});
```

Since `titles[3]` does not exist, the result is:

```javascript
{
    title: undefined
}
```

instead of:

```javascript
HTML
CSS
JavaScript
```

---

## Correct Version

```javascript
function addManyTasks(store, titles) {
    for (let i = 0; i < titles.length; i++) {
        setTimeout(() => {
            store.addTask({ title: titles[i] });
        }, 100);
    }
}
```

---

## Why Does `let` Fix the Problem?

Unlike `var`, `let` is **block-scoped**.

In a `for` loop, JavaScript creates a **new binding** of the variable `i` for every iteration. Each callback closes over its own copy of `i`, so when the callback executes later, it still remembers the correct index.

For example:

- First callback remembers `i = 0`
- Second callback remembers `i = 1`
- Third callback remembers `i = 2`

Therefore, each callback accesses the correct element in the `titles` array.

---

## Expected Output

```javascript
[
    { id: 1, title: "HTML", done: false },
    { id: 2, title: "CSS", done: false },
    { id: 3, title: "JavaScript", done: false }
]
```

---

## Key Concepts

- `var` is **function-scoped**.
- `let` is **block-scoped**.
- `setTimeout()` executes asynchronously after the loop completes.
- Closures capture variables from their surrounding scope.
- Using `let` creates a separate variable for each loop iteration, allowing each callback to remember the correct value.