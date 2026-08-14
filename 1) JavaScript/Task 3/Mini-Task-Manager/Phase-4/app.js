const TaskManager = require("./TaskManager");
const debounce = require("./debounce");

async function main() {

    const manager = new TaskManager();

    // Subscribe to events
    manager.on("taskAdded", (task) => {
        console.log(`Event: "${task.title}" was added.`);
    });

    manager.on("taskRemoved", (task) => {
        console.log(`Event: "${task.title}" was removed.`);
    });

    // Load tasks from the fake server
    await manager.loadTasks();

    console.log("Loaded Tasks:");
    console.log(manager.getTasks());

    // Create a debounced version of syncTask
    const debouncedSave = debounce(
        (task) => manager.syncTask(task),
        500
    );

    // Add a new task
    const task = manager.addTask(
        "Learn Pub/Sub",
        "high"
    );

    console.log("\nCalling save rapidly...");

    // Simulate many rapid save requests
    for (let i = 0; i < 10; i++) {
        debouncedSave(task);
    }

    console.log("Waiting for debounce...\n");

    // Wait long enough for debounce to execute
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Now remove the task
    manager.removeTask(task.id);

    console.log("\nFinal Task List:");
    console.log(manager.getTasks());

    console.log("\nProgram Finished.");
}

main();

/*

Tasks Loaded

Loaded Tasks:
[
  {
    id: 1,
    title: 'Fake Task from Server',
    priority: 'normal',
    done: false
  }
]

Event: "Learn Pub/Sub" was added.

Calling save rapidly...

Waiting for debounce...

Saved: Learn Pub/Sub

Event: "Learn Pub/Sub" was removed.

Final Task List:
[
  {
    id: 1,
    title: 'Fake Task from Server',
    priority: 'normal',
    done: false
  }
]

Program Finished.

*/