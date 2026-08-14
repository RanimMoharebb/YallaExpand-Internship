const TaskManager = require("./TaskManager");

const manager = new TaskManager();

console.log("===== Add Tasks =====");

manager.addTask("Learn Classes");
manager.addTask("Practice this", "high");
manager.addTask("Read about Prototypes", "high");
manager.addTask("Watch JavaScript videos", "low");

console.log(manager.getTasks());

console.log("\n===== Complete Task 2 =====");

manager.updateTask(2, {
    done: true
});

console.log(manager.getTasks());

console.log("\n===== Remove Task 4 =====");

manager.removeTask(4);

console.log(manager.getTasks());

console.log("\n===== High Priority =====");

console.log(manager.getTasksByPriority("high"));