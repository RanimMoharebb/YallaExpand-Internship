const createTaskStore = require("./taskStore");

const store = createTaskStore();

console.log("----- Adding Tasks -----");

store.addTask({
    title: "Learn Closures"
});

store.addTask({
    title: "Practice JavaScript"
});

console.log(store.getTasks());

console.log("\n----- Updating Task 1 -----");

store.updateTask(1, {
    done: true
});

console.log(store.getTasks());

console.log("\n----- Removing Task 2 -----");

store.removeTask(2);

console.log(store.getTasks());


Expected Output

/*
----- Adding Tasks -----

[
  { id: 1, title: 'Learn Closures', done: false },
  { id: 2, title: 'Practice JavaScript', done: false }
]

----- Updating Task 1 -----

[
  { id: 1, title: 'Learn Closures', done: true },
  { id: 2, title: 'Practice JavaScript', done: false }
]

----- Removing Task 2 -----

[
  { id: 1, title: 'Learn Closures', done: true }
]

*/