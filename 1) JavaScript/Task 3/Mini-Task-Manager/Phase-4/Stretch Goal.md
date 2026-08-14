----

# Stretch Goal – Publish/Subscribe (Pub/Sub)

## Objective

Implement a simple event system inside `TaskManager` so other parts of the application can subscribe to events.

---

## Implementation

Two methods were added:

```javascript
manager.on(eventName, callback);
manager.emit(eventName, data);
```

The following events were implemented:

- `taskAdded`
- `taskRemoved`

---

## Example

```javascript
manager.on("taskAdded", (task) => {
    console.log(`${task.title} was added.`);
});

manager.addTask("Learn Pub/Sub");
```

Output:

```text
Learn Pub/Sub was added.
```

---

## How It Works

- `on()` stores callback functions for a specific event.
- `emit()` executes every callback registered for that event.
- When a task is added or removed, the corresponding event is emitted automatically.

This demonstrates the Publish/Subscribe (Pub/Sub) pattern, where the `TaskManager` publishes events without knowing which parts of the application are listening.