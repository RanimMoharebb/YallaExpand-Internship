// same as phase 2 and 3

class Task {
    constructor(id, title, priority = "normal") {
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.done = false;
    }

    markComplete() {
        this.done = true;
    }
}

module.exports = Task;