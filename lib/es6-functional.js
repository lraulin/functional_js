const fForEach = (array, fn) => {
  for (let i = 0; i < array.length; i++) {
    fn(array[i]);
  }
};

const fForEachObject = (obj, fn) => {
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      fn(property, obj[property]);
    }
  }
};

const fUnless = (predicate, fn) => {
  if (!predicate) {
    fn();
  }
};

const fTimes = (times, fn) => {
  for (let i = 0; i < times; i++) {
    fn(i);
  }
};

const fEvery = (arr, fn) => {
  let result = true;
  for (const value of arr) {
    result = result && fn(value);
  }
  return result;
};

const fSome = (arr, fn) => {
  let result = false;
  for (const value of arr) {
    result = result || fn(value);
  }
  return result;
};

const fSortBy = property => {
  return (a, b) => {
    const result =
      a[property] < b[property] ? -1 : a[property] < b[property] ? 1 : 0;
    return result;
  };
};

const fTap = value => fn => (
  typeof fn === "function" && fn(value), console.log(value)
);

const fUnary = fn => (fn.length === 1 ? fn : arg => fn(arg));

const fOnce = fn => {
  let done = false;
  return function() {
    return done ? undefined : ((done = true), fn.apply(this, arguments));
  };
};

const fMemoized = fn => {
  const lookupTable = {};
  return arg => lookupTable[arg] || (lookupTable[arg] = fn(arg));
};

const fMap = (array, fn) => {
  let results = [];
  for (const value of array) {
    results.push(fn(value));
  }
  return results;
};

const fFilter = (array, fn) => {
  let results = [];
  for (const value of array) {
    fn(value) ? results.push(value) : undefined;
  }
  return results;
};

const fConcatAll = (array, fn) => {
  let results = [];
  for (const value of array) {
    results.push.apply(results, value);
  }
  return results;
};

const fReduce = (array, fn, initialValue) => {
  let accumulator;
  if (initialValue != undefined) {
    accumulator = initialValue;
  } else {
    accumulator = array[0];
  }

  if (initialValue === undefined) {
    for (let i = 0; i < array.length; i++) {
      accumulator = fn(accumulator, array[i]);
    }
  } else {
    for (const value of array) {
      accumulator = fn(accumulator, value);
    }
  }

  return [accumulator];
};

const fZip = (leftArr, rightArr, fn) => {
  let index,
    results = [];
  for (index = 0; index < Math.min(leftArr.length, rightArr.length); index++) {
    results.push(fn(leftArr[index], rightarr[index]));
  }
  return results;
};

const fArrayUtils = {
  fMap: fMap,
  fFilter: fFilter,
  fConcatAll: fConcatAll,
  flatten: fConcatAll,
  fReduce: fReduce,
  fZip: fZip,
};

export {
  fForEach,
  fForEachObject,
  fUnless,
  fTimes,
  fSortBy,
  fEvery,
  fSome,
  fTap,
  fUnary,
  fOnce,
  fMemoized,
  fMap,
  fFilter,
  fConcatAll,
  fReduce,
  fZip,
  fArrayUtils,
};
