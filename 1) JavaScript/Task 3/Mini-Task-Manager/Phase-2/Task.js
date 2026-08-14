class Task { // the class, Think of it as a blueprint
    
    constructor(id, title, priority = "normal") { // Runs automatically whenever you use new Task(...)
        this.id = id; // CurrentObject.id = id
        this.title = title;
        this.priority = priority;
        this.done = false;
    }

    markComplete() {
        this.done = true;
    }
}

module.exports = Task;