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
  bookDetailskdet,
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
