// fake APIs

function fetchTasksFromServer() {
    return new Promise((resolve) => {
        setTimeout(() => { 
            resolve([
                {
                    id: 1,
                    title: "Fake Task from Server",
                    priority: "normal",
                    done: false
                }
            ]);
        }, 1000); // Wait 1000 milliseconds (1 second), then run the resolve part-> It simulates network delay

    });
}

/*
fetchTasksFromServer()
        │
        ▼
Create Promise -> State = Pending
        │
        ▼
Start 1-second timer
        │
        ▼
After 1 second
        │
        ▼
resolve(tasks)
        │
        ▼
State = Resolved
        │
        ▼
await receives the tasks
        │
        ▼
complete the code inside async function (this.tasks = tasks ... )
*/

function saveTaskToServer(task) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (Math.random() < 0.2) {
                reject(new Error("Save Failed"));
            }
            else {
                resolve({
                    ...task,
                    saved: true
                });
                // The spread operator (...) copies all properties from task into a new object, then adds (or overrides) the saved property
            }

        }, 300); // 300 ms = 0.3 seconds

    });
}

module.exports = {
    fetchTasksFromServer,
    saveTaskToServer
};