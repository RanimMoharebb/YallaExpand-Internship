// same as phase 3
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
        }, 1000);
    });
}

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
            }

        }, 300);

    });
}

module.exports = {
    fetchTasksFromServer,
    saveTaskToServer
};