const reverse = str => str && reverse(str.slice(1)) + str[0];

const isPalindrome = str => str === reverse(str);

const someRecursive = (arr, cb) => (arr.length && (cb(arr[0]) || someRecursive(arr.slice(1), cb))) || false;

const flatten = arr =>
    arr.length ?
      Array.isArray(arr[0]) ?
        flatten(arr[0]).concat(flatten(arr.slice(1))) :
        [arr[0]].concat(flatten(arr.slice(1)))
      : [];

const capitalize = str => str && (str[0].toUpperCase() + str.slice(1));

const capitalizeWhole = str => str && (str[0].toUpperCase() + capitalizeWhole(str.slice(1)));

const capitalizeFirst = arr => arr.length && [capitalize(arr[0])].concat(capitalizeFirst(arr.slice(1))) || [];

const mapRecursive = (arr, cb, i=0, initArr=arr) => arr.length && [cb(arr[0], i, initArr)].concat(mapRecursive(arr.slice(1), cb, i++, initArr)) || [];

const capitalizeWords = arr => mapRecursive(arr, capitalizeWhole);

const isObject = sub => sub && typeof sub === 'object' && !Array.isArray(sub);

const isNumber = sub => typeof sub === 'number';

const isEven = sub =>
  isNumber(sub)
    && sub % 2 === 0

const nestedEvenSum = o =>
  Object.values(o).reduce((r,c) =>
    r +
      (isObject(c) ?
        nestedEvenSum(c) :
        isEven(c) ? c : 0)
  , 0)

const stringifyNumbers = o =>
  Object.keys(o).reduce((r,c) =>
    Object.assign(r,
      {
        [c]: isObject(o[c]) ?
          stringifyNumbers(o[c])
            :
          isNumber(o[c]) ?
            o[c] + ''
              :
            o[c]
      }
    ),
  {});


const collectStrings = o =>
      Object.values(o).reduce((r,c) =>
        isObject(c) ?
          r.concat(collectStrings(c))
            :
          typeof c === 'string' ? r.concat(c) : r
      , []);


const iterateArray = (arr, fromInd, cb, breakCbBefore, reverse) => {
  const len = arr.length;
  if (!reverse) {
    for (let i = fromInd; i < len; i++) {
      const v = arr[i];
      if (breakCbBefore && breakCbBefore(v, i, arr)) return i;
      cb && cb(v, i, arr);
    }
    return len;
  } else {
    for (let i = fromInd; i >= 0; i--) {
      const v = arr[i];
      if (breakCbBefore && breakCbBefore(v, i, arr)) return i;
      cb && cb(v, i, arr);
    }
    return -1;
  }
};

const linearSearch = (arr, val) => iterateArray(arr, arr.length - 1, null, v => v === val, true);

const getMiddle = (int1, int2) => Math.floor((int1 + int2) / 2);

// const binarySearch = (haystack, needle) => {
//   let left = 0;
//   let right = haystack.length - 1;
//   let middle = getMiddle(left, right);
//   while (haystack[middle] !== needle) {
//     if (right === left) return -1;
//     if (haystack[middle] < needle) left = middle + 1;
//     else right = middle - 1;
//     middle = getMiddle(left, right);
//     console.log(left, right, middle);
//   }
//   return middle;
// }


const binarySearch = (haystack, needle) => {
  let left = 0;
  let right = haystack.length - 1;
  while (left < right) {
    const middle = getMiddle(left, right);
    console.log(left, right, middle);
    if (haystack[middle] === needle) return middle;
    if (haystack[middle] < needle) left = middle + 1;
    else right = middle - 1;
  }
  return haystack[left] === needle ? left : -1;
}


// const naiveSearch = (haystack, needle) => {
//   let counter = 0;
//   let save;
//   for (let i = 0; i < haystack.length; i++) {
//     if (haystack[i] === needle[0]) {
//       console.log("TCL: naiveSearch -> i", i)
//       save = i++;
//       for (let j = 1; j < needle.length; j++, i++) {
//         console.log("TCL: naiveSearch -> i, j", i, j)
//         if (haystack[i] !== needle[j]) break;
//       }
//         console.log("TCL: naiveSearch -> save, i", save, i)
//         // if (i - save === needle.length) counter++;
//         if (i-- - save === needle.length) counter++;
//     }
//   }
//   return counter;
// }

const naiveSearch = (haystack, needle) => {
  let counter = 0;
  let save;
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      let j = 1;
      for (; j < needle.length; j++) {
        if (haystack[i + j] !== needle[j]) break;
      }
        if (j  === needle.length) {
          counter++;
          i += j - 1;
        }
    }
  }
  return counter;
}




var assert = chai.assert;

describe('naiveSearch - multiple pointers', function() {
  it("naiveSearch('cdcdce', 'cdce') should return 1", function() {
    assert.equal(naiveSearch('cdcdce', 'cdce'),1);
  });

  it("naiveSearch('loolollol', 'lol') should return 2", function() {
    assert.equal(naiveSearch('loolollol', 'lol'),2);
  });

  it("naiveSearch('lolollol', 'lol') should return 2", function() {
    assert.equal(naiveSearch('lolollol', 'lol'),2);
  });

  it("naiveSearch('looool', 'lol') should return 0", function() {
    assert.equal(naiveSearch('looool', 'lol'),0);
  });

  it("naiveSearch('', 'lol') should return 0", function() {
    assert.equal(naiveSearch('', 'lol'),0);
  });

  it("naiveSearch('abcdefg', 'abc') should return 1", function() {
    assert.equal(naiveSearch('abcdefg', 'abc'),1);
  });

  // it("findLongestSubstring('bbbbbb'), should return 1", function() {
  //   assert.equal(findLongestSubstring('bbbbbb'), 1);
  // });

  // it("findLongestSubstring('longestsubstring'), should return 8", function() {
  //   assert.equal(findLongestSubstring('longestsubstring'), 8);
  // });

  // it("findLongestSubstring('thisishowwedoit'), should return 6", function() {
  //   assert.equal(findLongestSubstring('thisishowwedoit'), 6);
  // });
});
