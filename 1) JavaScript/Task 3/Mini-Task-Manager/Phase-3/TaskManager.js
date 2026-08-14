const Task = require("./Task");

const {
    fetchTasksFromServer,
    saveTaskToServer
} = require("./api");

class TaskManager {

    constructor() {

        this.tasks = [];
        this.nextId = 1;

    }

    addTask(title, priority = "normal") {

        const task = new Task(
            this.nextId++,
            title,
            priority
        );

        this.tasks.push(task);

        return task;

    }

    getTasks() {

        return [...this.tasks];

    }

    removeTask(id) {

        this.tasks =
            this.tasks.filter(task => task.id !== id);

    }

    updateTask(id, updates) {

        const task =
            this.tasks.find(task => task.id === id);

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

            // if Real server -> const response = await fetch("/api/tasks");

            const tasks =
                await fetchTasksFromServer();
            // 1) fetchTasksFromServer() -> returns -> Promise (Pending)
            // 2) await
            // 3) return -> Resolved promise / rehected promise

            this.tasks = tasks;

            this.nextId =
                tasks.length + 1;

            console.log("Tasks Loaded");

        }

        catch (error) {

            console.log(
                "Loading Failed:",
                error.message
            );

        }

    }

    async syncTask(task) {

        try {

            const saved =
                await saveTaskToServer(task);

            console.log(
                "Saved:",
                saved.title
            );

            return saved;

        }

        catch (error) {

            console.log(
                "Error:",
                error.message
            );

            return null;

        }

    }

}

module.exports = TaskManager;