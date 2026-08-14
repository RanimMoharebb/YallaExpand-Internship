// Factory Function -> creates and returns an object
function createTaskStore() {
    // Private variables (only accessible through closures)
    let tasks = [];
    let nextId = 1;

    // Add a new task
    function addTask(task) {
        const newTask = {
            id: nextId++, // user shouldn't decide the id
            title: task.title,
            done: false
        };
        tasks.push(newTask); // Adds the task to the private array
        return newTask; 
    }
    
    // Return a copy of all tasks
    function getTasks() {
        return [...tasks]; // store.getTasks().push(...) would modify the private array so [...tasks] creates a new array
    }

    // Remove a task by id
    function removeTask(id) {
        tasks = tasks.filter(task => task.id !== id); // Filter creates a new array without the removed task
    }

    // Update a task
    function updateTask(id, updates) {
        const task = tasks.find(task => task.id === id); // find() returns the first matching task
        if (!task) {
            return false;
        }
        Object.assign(task, updates); // It copies every property from updates into task
        return true;
    // updates :-
    //{
    //done:true
    //}
    }

    // Public API :-
    // The outside world only sees these methods, Everything else stays private
    return {
        addTask,
        getTasks,
        removeTask,
        updateTask
    };
}

module.exports = createTaskStore;