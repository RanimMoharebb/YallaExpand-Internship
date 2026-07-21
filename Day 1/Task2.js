function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    if (promises.length === 0) {
      return resolve([]);
    }

    const results = new Array(promises.length);
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// ---------------------- Testing ----------------------

myPromiseAll([
  Promise.resolve(1),
  2,
  new Promise((resolve) => setTimeout(() => resolve(3), 100))
]).then(console.log);
// [1,2,3]

myPromiseAll([
  Promise.resolve("A"),
  Promise.reject("Error"),
  Promise.resolve("C")
])
.then(console.log)
.catch(console.error);
// Error