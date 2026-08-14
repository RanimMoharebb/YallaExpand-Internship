const TaskManager = require("./TaskManager");

async function main() {

    const manager =
        new TaskManager();

    console.log("Loading...");

    await manager.loadTasks();

    console.log(manager.getTasks());

    manager.addTask(
        "Learn Async",
        "high"
    );

    manager.addTask(
        "Practice Await",
        "normal"
    );

    console.log();

    console.log("Current Tasks");

    console.log(manager.getTasks());

    console.log();

    console.log("Syncing...");

    const tasks =
        manager.getTasks();

    for (const task of tasks) {

        await manager.syncTask(task);

    }

    console.log();

    console.log("Finished");

}

main();