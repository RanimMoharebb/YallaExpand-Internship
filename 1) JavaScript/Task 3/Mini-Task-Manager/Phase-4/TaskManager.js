const Task = require("./Task");
const {
    fetchTasksFromServer,
    saveTaskToServer
} = require("./api");

class TaskManager {

    constructor() {
        this.tasks = [];
        this.nextId = 1;

        // Stores all event listeners
        // Example:
        // {
        //   taskAdded: [callback1, callback2],
        //   taskRemoved: [callback3]
        // }
        this.events = {};
    }

    addTask(title, priority = "normal") {

        const task = new Task(
            this.nextId++,
            title,
            priority
        );

        this.tasks.push(task);

        // Notify subscribers that a task was added
        this.emit("taskAdded", task);

        return task;
    }

    getTasks() {
        return [...this.tasks];
    }

    removeTask(id) {

        const task = this.tasks.find(task => task.id === id);

        if (!task) {
            return false;
        }

        this.tasks = this.tasks.filter(task => task.id !== id);

        // Notify subscribers that a task was removed
        this.emit("taskRemoved", task);

        return true;
    }

    updateTask(id, updates) {

        const task = this.tasks.find(task => task.id === id);

        if (!task) {
            return false;
        }

        Object.assign(task, updates);

        return true;
    }

    getTasksByPriority(priority) {

        return this.tasks.filter(
            task => task.priority === priority
        );
    }

    async loadTasks() {

        try {

            const tasks = await fetchTasksFromServer();

            this.tasks = tasks;
            this.nextId = tasks.length + 1;

            console.log("Tasks Loaded");

        }
        catch (error) {

            console.log("Loading Failed:", error.message);

        }
    }

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

    // Subscribe to an event
    on(eventName, callback) {

        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);
    }

    // Trigger an event
    emit(eventName, data) {

        const listeners = this.events[eventName];

        if (!listeners) {
            return;
        }

        for (const callback of listeners) {
            callback(data);
        }
    }

}

module.exports = TaskManager;