Array.prototype.myMap = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const array = Object(this);
  const length = array.length >>> 0;
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    if (i in array) {
      result[i] = callback.call(thisArg, array[i], i, array);
    }
  }

  return result;
};

// ---------------------- Testing ----------------------

console.log(
  [1, 2, 3].myMap((x) => x * 2)
);
// [2,4,6]

console.log(
  [1, 2, 3].myMap(function (x) {
    return x + this.offset;
  }, { offset: 10 })
);
// [11,12,13]

const sparse = [1, , 3];
const mapped = sparse.myMap((x) => x * 2);

console.log(mapped);
// [2, <1 empty item>, 6]

console.log(1 in mapped);
// false