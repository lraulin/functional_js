import {
  fForEach,
  fForEachObject,
  fUnless,
  fTimes,
  fSortBy,
  fEvery,
  fSome,
  fOnce,
  fMemoized,
  fMap,
  fFilter,
  fConcatAll,
  fReduce,
  fZip,
  curry,
  curryN,
  partial,
} from "../lib/es6-functional";
import { WSAEPROTOTYPE } from "constants";

let object = { a: 1, b: 2 };
fForEachObject(object, (k, v) => console.log(k + ":" + v));

// find even numbers of given array
fForEach([1, 2, 3, 4, 5, 6, 7], number => {
  fUnless(number % 2, () => {
    console.log(number, " is even");
  });
});

// finding the first 100 even numbers
fTimes(100, function(n) {
  fUnless(n % 2, function() {
    console.log(n, "is even");
  });
});

console.log(fEvery([NaN, NaN, NaN], isNaN));
console.log(fEvery([NaN, NaN, 1], isNaN));

var people = [
  { firstname: "aaFirstName", lastname: "cclastName" },
  { firstname: "ccFirstName", lastname: "aalastName" },
  { firstname: "bbFirstName", lastname: "bblastName" },
];

// sorting with respect to firstname
console.log(
  "FirstName sort using fSortBy HOC",
  people.sort(fSortBy("firstname")),
);

// sorting with respect to lastname
console.log(
  "LastName sort using fSortBy HOC",
  people.sort(fSortBy("lastname")),
);

var doPayment = fOnce(() => {
  console.log("Payment is done");
});

// this should work
doPayment();

// oops, we are doing it a second time!
doPayment();

// slow factorial
var factorial = n => {
  if (n === 0) {
    return 1;
  }
  // This is it! Recursion!
  return n * factorial(n - 1);
};

console.log("Factorial of 2 is", factorial(2));
console.log("Factorial of 3 is", factorial(3));

// memoized factorial
let fastFactorial = fMemoized(n => {
  if (n === 0) {
    return 1;
  }

  // This is it! Recursion!
  return n * fastFactorial(n - 1);
});

console.log("Fast Factorialeof 2 is", fastFactorial(2));
console.log("Fast Factorialeof 3 is", fastFactorial(3));
console.log("Fast Factorialeof 7 is", fastFactorial(7));

let squaredArray = fMap([1, 2, 3], x => x * x);
console.log(squaredArray);

let apressBooks = [
  {
    id: 111,
    title: "C# 6.0",
    author: "ANDREW TROELSEN",
    rating: [4.7],
    reviews: [{ good: 4, excellent: 12 }],
  },
  {
    id: 222,
    title: "Efficient Learning Machines",
    author: "Rahul Khanna",
    rating: [4.5],
    reviews: [],
  },
  {
    id: 333,
    title: "Pro AngularJS",
    author: "Adam Freeman",
    rating: [4.0],
    reviews: [],
  },
  {
    id: 444,
    title: "Pro ASP.NET",
    author: "Adam Freeman",
    rating: [4.2],
    reviews: [{ good: 14, excellent: 12 }],
  },
];

// get only title and author fields
let resultOfTitleName = fMap(apressBooks, book => {
  return { title: book.title, author: book.author };
});

console.log(resultOfTitleName);

// get only book with above rating 4.5
let filteredArray = fFilter(apressBooks, book => book.rating[0] > 4.5);

console.log(filteredArray);

// get title and author whose rating is above 4.5
let goodRatingBooks = fFilter(apressBooks, book => book.rating[0] > 4.5);

console.log(
  "Good Rated books",
  fMap(goodRatingBooks, book => {
    return { title: book.title, author: book.author };
  }),
);

//modified data structure.
let apressBooks2 = [
  {
    name: "beginners",
    bookDetails: [
      {
        id: 111,
        title: "C# 6.0",
        author: "ANDREW TROELSEN",
        rating: [4.7],
        reviews: [{ good: 4, excellent: 12 }],
      },
      {
        id: 222,
        title: "Efficient Learning Machines",
        author: "Rahul Khanna",
        rating: [4.5],
        reviews: [],
      },
    ],
  },
  {
    name: "pro",
    bookDetails: [
      {
        id: 333,
        title: "Pro AngularJS",
        author: "Adam Freeman",
        rating: [4.0],
        reviews: [],
      },
      {
        id: 444,
        title: "Pro ASP.NET",
        author: "Adam Freeman",
        rating: [4.2],
        reviews: [{ good: 14, excellent: 12 }],
      },
    ],
  },
];

console.log(
  "Mapped new data structure",
  fMap(apressBooks2, book => {
    return book.bookDetails;
  }),
);

console.log(
  "Flattened Array",
  fConcatAll(
    fMap(apressBooks2, book => {
      return book.bookDetails;
    }),
  ),
);

// result of our problem
let goodRatingCriteria = book => book.rating[0] > 4.5;
console.log(
  "Result using map, filter, concatAll",
  fFilter(
    fConcatAll(
      fMap(apressBooks2, book => {
        return book.bookDetails;
      }),
    ),
    goodRatingCriteria,
  ),
);

console.log(
  "Sum of the array",
  fReduce([1, 2, 3, 4, 5], (acc, val) => acc + val, 0),
);

console.log(
  "Product of the array",
  fReduce([1, 2, 3, 4, 5], (acc, val) => acc * val, 1),
);

let bookDetails = fConcatAll(fMap(apressBooks2, book => book.bookDetails));

let resultOfCountReviews = fReduce(
  bookDetails,
  (acc, bookDetail) => {
    let goodReviews =
      bookDetail.reviews[0] != undefined ? bookDetail.reviews[0].good : 0;
    let excellentReviews =
      bookDetail.reviews[0] != undefined ? bookDetail.reviews[0].excellent : 0;
    return {
      good: acc.good + goodReviews,
      excellent: acc.excellent + excellentReviews,
    };
  },
  { good: 0, excellent: 0 },
);

console.log("Good and Excellent count", resultOfCountReviews);

console.log(
  "Addition of two arrays using zip",
  fZip([1, 2, 3], [4, 5, 6], (x, y) => x + y),
);

let apressBooks3 = [
  {
    name: "beginners",
    bookDetails: [
      {
        id: 111,
        title: "C# 6.0",
        author: "ANDREW TROELSEN",
        rating: [4.7],
      },
      {
        id: 222,
        title: "Efficient Learning Machines",
        author: "Rahul Khanna",
        rating: [4.5],
        reviews: [],
      },
    ],
  },
  {
    name: "pro",
    bookDetails: [
      {
        id: 333,
        title: "Pro AngularJS",
        author: "Adam Freeman",
        rating: [4.0],
        reviews: [],
      },
      {
        id: 444,
        title: "Pro ASP.NET",
        author: "Adam Freeman",
        rating: [4.2],
      },
    ],
  },
];

let reviewDetails = [
  {
    id: 111,
    reviews: [{ good: 4, excellent: 12 }],
  },
  {
    id: 222,
    reviews: [],
  },
  {
    id: 333,
    reviews: [],
  },
  {
    id: 444,
    reviews: [{ good: 14, excellent: 12 }],
  },
];

let bookDetails3 = fConcatAll(
  fMap(apressBooks3, book => {
    return book.bookDetails;
  }),
);

let mergedBookDetails = fZip(bookDetails3, reviewDetails, (book, review) => {
  if (book.id === review.id) {
    let clone = Object.assign({}, book);
    clone.ratings = review;
    return clone;
  }
});

// Chapter 6

const add = (x, y) => x + y;
let autoCurriedAdd = curry(add);
console.log("Curried summation", autoCurriedAdd(2)(2));

const genericTable = (x, y) => x * y;

const tableOf2 = curry(genericTable)(2);
const tableOf3 = curry(genericTable)(3);
const tableOf4 = curry(genericTable)(4);

console.log("Table via currying");
console.log("2 * 2 =", tableOf2(2));
console.log("2 * 3 =", tableOf2(3));
console.log("2 * 4 =", tableOf2(4));

console.log("3 * 2 =", tableOf3(2));
console.log("3 * 3 =", tableOf3(3));
console.log("3 * 4 =", tableOf3(4));

console.log("4 * 2 =", tableOf4(2));
console.log("4 * 3 =", tableOf4(3));
console.log("4 * 4 =", tableOf4(4));

const loggerHelper = (mode, initialMessage, errorMessage, lineNo) => {
  if (mode === "DEBUG") {
    console.debug(initialMessage, errorMessage + " at line: " + lineNo);
  } else if (mode === "ERROR") {
    console.error(initialMessage, errorMessage + " at line: " + lineNo);
  } else if (mode === "WARN") {
    console.warn(initialMessage, errorMessage + " at line: " + lineNo);
  } else {
    throw "Wrong mode";
  }
};

let errorLogger = curryN(loggerHelper)("ERROR")("Error At Stats.js");
let debugLogger = curryN(loggerHelper)("DEBUG")("Debug At Stats.js");
let warnLogger = curryN(loggerHelper)("WARN")("Warn At Stats.js");

// for error
errorLogger("Error message", 21);

// for debug
debugLogger("Debug message", 233);

// for warn
warnLogger("Warn message", 34);

let match = curryN(function(expr, str) {
  return str.match(expr);
});

let hasNumber = match(/[0-9]+/);

let filter = curryN(function(f, ary) {
  return ary.filter(f);
});

let findNumbersInArray = filter(hasNumber);
console.log("Finding numbers via curry", findNumbersInArray(["js", "number1"]));

let map = curry(function(f, ary) {
  return ary.map(f);
});

let squareAll = map(x => x * x);

console.log("Squaring the array with currying", squareAll([(1, 2, 3)]));

setTimeout(() => console.log("Print after 10 ms."), 10);

const setTimeoutWrapper = (time, fn) => {
  setTimeout(fn, time);
};

// using currying
const delayTenMs = curryN(setTimeoutWrapper)(10);
delayTenMs(() => console.log("Do X task"));
delayTenMs(() => console.log("Do Y task"));

// using partial application
let delayTenMsPartial = partial(setTimeout, undefined, 10);
delayTenMsPartial(() => console.log("Do X. . .  task"));
delayTenMsPartial(() => console.log("Do Y . . . . task"));

let prettyPrintJson = partial(JSON.stringify, undefined, null, 2);
console.log(
  "JSON pretty print via partial",
  prettyPrintJson({ foo: "bar", bar: "foo" }),
);
