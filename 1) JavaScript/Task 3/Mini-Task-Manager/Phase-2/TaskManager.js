const Task = require("./Task");

class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }
    // tasks is now a property of the manager object.

    addTask(title, priority = "normal") {
        const task = new Task(this.nextId++, title, priority);

        this.tasks.push(task);

        return task;
    }

    getTasks() {
        return [...this.tasks];
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTask(id, updates) {
        const task = this.tasks.find(task => task.id === id);

        if (!task) {
            return false;
        }

        Object.assign(task, updates); // updates only the supplied properties

        return true;
    }

    getTasksByPriority(priority) {
        return this.tasks.filter(task => task.priority === priority);
    }
}

module.exports = TaskManager;