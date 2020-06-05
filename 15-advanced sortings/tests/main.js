const swap = (arr, i, j) => void ([arr[i], arr[j]] = [arr[j], arr[i]]);

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomIntExcept = (min, max, exceptions) => {
  let result;
  while (true) {
    result = getRandomInt(min, max);
    if (!exceptions.includes(result)) return result;
  }
};
const getRandomBool = () => Boolean(getRandomInt(0, 100) >= 50);

const createRanndomUnsorted = (n) => Array.from({ length: n }, () => Math.random());

const randomUnsorted = createRanndomUnsorted(5000);

const randomSorted = randomUnsorted.sort((a, b) => a - b);

const mergeSorted = (arr1, arr2) => {
  let i = 0,
    j = 0;
  const len1 = arr1.length;
  const len2 = arr2.length;
  let merged = [];
  while (i < len1 && j < len2) {
    arr1[i] === arr2[j]
      ? merged.push(arr1[i++], arr2[j++])
      : arr1[i] < arr2[j]
      ? merged.push(arr1[i++])
      : merged.push(arr2[j++]);
  }

  while (i < len1) {
    merged.push(arr1[i++]);
  }

  while (j < len2) {
    merged.push(arr2[j++]);
  }
  return merged;
};

var assert = chai.assert;

// describe('mergeSorted', function () {
//   it('mergeSorted for [2,4,6],[-1,0,1,3,5] should return [-1,0,1,2,3,4,5,6]', function () {
//     assert.deepEqual(mergeSorted([2, 4, 6], [-1, 0, 1, 3, 5]), [-1, 0, 1, 2, 3, 4, 5, 6]);
//   });

//   it('mergeSorted for [0,1,2,3],[4,5,6,7] should return [0,1,2,3,4,5,6,7]', function () {
//     assert.deepEqual(mergeSorted([0, 1, 2, 3], [4, 5, 6, 7]), [0, 1, 2, 3, 4, 5, 6, 7]);
//   });

//   it('mergeSorted for [-1,10,12], [-10,1,11] should return [-10,-1,1,10,11,12]', function () {
//     assert.deepEqual(mergeSorted([-1, 10, 12], [-10, 1, 11]), [-10, -1, 1, 10, 11, 12]);
//   });

//   it('mergeSorted for [0,1,2,3],[1,2,3,4,5] should return [0,1,1,2,2,3,3,4,5]', function () {
//     assert.deepEqual(mergeSorted([0, 1, 2, 3], [1, 2, 3, 4, 5]), [0, 1, 1, 2, 2, 3, 3, 4, 5]);
//   });
// });

// const mergeSort = (arr, half = Math.floor(arr.length / 2)) =>
//   arr.length > 1 ? mergeSorted(mergeSort(arr.slice(0, half)), mergeSort(arr.slice(half))) : arr;

const freeze = (arr) => JSON.parse(JSON.stringify(arr));

const mergeSort = (arr) => {
  let splitted = arr.map((item) => [item]);
  splitted = splitted.reduce((r, c) => mergeSorted(r, c));
  return splitted;
};

// describe('mergeSort', function () {
//   it('mergeSort for [3,1,2,7,74,19,28] should return [1,2,3,7,19,28,74]', function () {
//     assert.deepEqual(mergeSort([3, 1, 2, 7, 74, 19, 28]), [1, 2, 3, 7, 19, 28, 74]);
//   });

//   it('mergeSort for [-2,10,0,-1,8] should return [-2,-1,0,8,10]', function () {
//     assert.deepEqual(mergeSort([-2, 10, 0, -1, 8]), [-2, -1, 0, 8, 10]);
//   });

//   it('mergeSort for [1,2,3,4,5] should return [1,2,3,4,5]', function () {
//     assert.deepEqual(mergeSort([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
//   });

//   it('mergeSort for [5,4,3,2,1] should return [1,2,3,4,5]', function () {
//     assert.deepEqual(mergeSort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
//   });

//   it('mergeSort for [8,1,2,3,4,5,6,7] should return [1,2,3,4,5,6,7,8]', function () {
//     assert.deepEqual(mergeSort([8, 1, 2, 3, 4, 5, 6, 7]), [1, 2, 3, 4, 5, 6, 7, 8]);
//   });

//   it('mergeSort for randomUnsorted should return randomSorted', function () {
//     assert.deepEqual(mergeSort(randomUnsorted), randomSorted);
//   });
// });

// const freeze = arr => JSON.parse(JSON.stringify(arr));

const pivot = (arr, start = 0, end = arr.length - 1) => {
  let pivot = arr[start];

  let swapWithNextLesserThanPivotInd = start + 1;

  for (let i = start + 1; i < end + 1; i++) {
    if (arr[i] < pivot) {
      i === swapWithNextLesserThanPivotInd++ || swap(arr, i, swapWithNextLesserThanPivotInd);
    }
  }

  if (start != swapWithNextLesserThanPivotInd) swap(arr, start, swapWithNextLesserThanPivotInd - 1);
  return swapWithNextLesserThanPivotInd - 1;
};

const quickSort = (arr) => {
  const len = arr.length;
  if (len < 2) return arr;

  const pivotInd = pivot(arr);

  return [].concat(quickSort(arr.slice(0, pivotInd)), arr[pivotInd], quickSort(arr.slice(pivotInd + 1)));
};

// describe('quickSort', function () {
//   it('quickSort for [3,1,2,7,74,19,28] should return [1,2,3,7,19,28,74]', function () {
//     assert.deepEqual(quickSort([3, 1, 2, 7, 74, 19, 28]), [1, 2, 3, 7, 19, 28, 74]);
//   });

//   it('quickSort for [-2,10,0,-1,8] should return [-2,-1,0,8,10]', function () {
//     assert.deepEqual(quickSort([-2, 10, 0, -1, 8]), [-2, -1, 0, 8, 10]);
//   });

//   it('quickSort for [1,2,3,4,5] should return [1,2,3,4,5]', function () {
//     assert.deepEqual(quickSort([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
//   });

//   it('quickSort for [5,4,3,2,1] should return [1,2,3,4,5]', function () {
//     assert.deepEqual(quickSort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
//   });

//   it('quickSort for [8,1,2,3,4,5,6,7] should return [1,2,3,4,5,6,7,8]', function () {
//     assert.deepEqual(quickSort([8, 1, 2, 3, 4, 5, 6, 7]), [1, 2, 3, 4, 5, 6, 7, 8]);
//   });

//   it('quickSort for [0,5,7,10,1,6,11] should return [0,1,5,6,7,10,11]', function () {
//     assert.deepEqual(quickSort([0,5,7,10,1,6,11]), [0,1,5,6,7,10,11]);
//   });

//   it('quickSort for randomUnsorted should return randomSorted', function () {
//     assert.deepEqual(quickSort(randomUnsorted), randomSorted);
//   });
// });

const quickSortInPlace = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const pivotInd = pivot(arr, left, right);
    pivotInd && quickSortInPlace(arr, left, pivotInd - 1);
    quickSortInPlace(arr, pivotInd + 1, right);
  }

  return arr;
};

describe('quickSortInPlace', function () {
  // it('quickSortInPlace for [3,1,2,7,74,19,28] should return [1,2,3,7,19,28,74]', function () {
  //   assert.deepEqual(quickSortInPlace([3, 1, 2, 7, 74, 19, 28]), [1, 2, 3, 7, 19, 28, 74]);
  // });

  // it('quickSortInPlace for [-2,10,0,-1,8] should return [-2,-1,0,8,10]', function () {
  //   assert.deepEqual(quickSortInPlace([-2, 10, 0, -1, 8]), [-2, -1, 0, 8, 10]);
  // });

  // it('quickSortInPlace for [1,2,3,4,5] should return [1,2,3,4,5]', function () {
  //   assert.deepEqual(quickSortInPlace([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
  // });

  // it('quickSortInPlace for [5,4,3,2,1] should return [1,2,3,4,5]', function () {
  //   assert.deepEqual(quickSortInPlace([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
  // });

  // it('quickSortInPlace for [8,1,2,3,4,5,6,7] should return [1,2,3,4,5,6,7,8]', function () {
  //   assert.deepEqual(quickSortInPlace([8, 1, 2, 3, 4, 5, 6, 7]), [1, 2, 3, 4, 5, 6, 7, 8]);
  // });

  it('quickSortInPlace for [0,5,7,10,1,6,11] should return [0,1,5,6,7,10,11]', function () {
    assert.deepEqual(quickSortInPlace([0, 5, 7, 10, 1, 6, 11]), [0, 1, 5, 6, 7, 10, 11]);
  });

  // it('quickSortInPlace for randomUnsorted should return randomSorted', function () {
  //   assert.deepEqual(quickSortInPlace(randomUnsorted), randomSorted);
  // });
});

const getDigitByPos = (num, i) => Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;

const getNumLength = (num) => (num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1);

const getMaxNumLength = (arr) => arr.reduce((r, c) => Math.max(r, getNumLength(c)), 0);

const radixSort = (arr) => {
  const maxNumPos = getMaxNumLength(arr);

  const fillBuckets = (buckets, arr, numPos) => {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      const current = arr[i];
      const bucket = getDigitByPos(current, numPos);
      buckets[bucket].push(current);
    }
  };

  for (let numPos = 0; numPos < maxNumPos; numPos++) {
    let buckets = Array.from({ length: 10 }, () => []);
    fillBuckets(buckets, arr, numPos);
    arr = [].concat(...buckets);
  }
  return arr;
};

// describe('radixSort', function () {
//   it('radixSort for [3,1,2,7,74,19,28] should return [1,2,3,7,19,28,74]', function () {
//     assert.deepEqual(radixSort([3, 1, 2, 7, 74, 19, 28]), [1, 2, 3, 7, 19, 28, 74]);
//   });

//   it('radixSort for [-2,10,0,-1,8] should return [-2,-1,0,8,10]', function () {
//     assert.deepEqual(radixSort([-2, 10, 0, -1, 8]), [-2, -1, 0, 8, 10]);
//   });

//   it('radixSort for [1,2,3,4,5] should return [1,2,3,4,5]', function () {
//     assert.deepEqual(radixSort([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
//   });

//   it('radixSort for [5,4,3,2,1] should return [1,2,3,4,5]', function () {
//     assert.deepEqual(radixSort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
//   });

//   it('radixSort for [8,1,2,3,4,5,6,7] should return [1,2,3,4,5,6,7,8]', function () {
//     assert.deepEqual(radixSort([8, 1, 2, 3, 4, 5, 6, 7]), [1, 2, 3, 4, 5, 6, 7, 8]);
//   });

//   it('radixSort for randomUnsorted should return randomSorted', function () {
//     assert.deepEqual(radixSort(randomUnsorted), randomSorted);
//   });
// });

const partition = (arr, left, right) => {
  const pivotEl = arr[left];
  let j = left;
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] <= pivotEl) {
      j++;
      swap(arr, j, i);
    }
  }
  swap(arr, left, j);
  return j;
};

// const quickSortNew = (arr = [], left = 0, right = arr.length - 1) => {
//   if (left >= right) return;
//   const k = getRandomInt(left, right);
//   swap(arr, left, k);
//   const pivotInd = partition(arr, left, right);
//   quickSortNew(arr, left, pivotInd - 1);
//   quickSortNew(arr, pivotInd + 1, right);
//   return arr;
// };

const quickSortNew = (arr = [], left = 0, right = arr.length - 1) => {
  while (left < right) {
    const k = getRandomInt(left, right);
    swap(arr, left, k);
    const pivotInd = partition(arr, left, right);
    if (pivotInd - left < right - pivotInd) {
      quickSortNew(arr, left, pivotInd - 1);
      left = pivotInd + 1;
    } else {
      quickSortNew(arr, pivotInd + 1, right);
      right = pivotInd - 1;
    }
  }
  return arr;
};

describe('quickSortNew', function () {
  it('quickSortNew for [3,1,2,7,74,19,28] should return [1,2,3,7,19,28,74]', function () {
    assert.deepEqual(quickSortNew([3, 1, 2, 7, 74, 19, 28]), [1, 2, 3, 7, 19, 28, 74]);
  });

  it('quickSortNew for [-2,10,0,-1,8] should return [-2,-1,0,8,10]', function () {
    assert.deepEqual(quickSortNew([-2, 10, 0, -1, 8]), [-2, -1, 0, 8, 10]);
  });

  it('quickSortNew for [1,2,3,4,5] should return [1,2,3,4,5]', function () {
    assert.deepEqual(quickSortNew([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
  });

  it('quickSortNew for [5,4,3,2,1] should return [1,2,3,4,5]', function () {
    assert.deepEqual(quickSortNew([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
  });

  it('quickSortNew for [8,1,2,3,4,5,6,7] should return [1,2,3,4,5,6,7,8]', function () {
    assert.deepEqual(quickSortNew([8, 1, 2, 3, 4, 5, 6, 7]), [1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('quickSortNew for [0,5,7,10,1,6,11] should return [0,1,5,6,7,10,11]', function () {
    assert.deepEqual(quickSortNew([0, 5, 7, 10, 1, 6, 11]), [0, 1, 5, 6, 7, 10, 11]);
  });

  it('quickSortNew for randomUnsorted should return randomSorted', function () {
    const randomUnsorted = createRanndomUnsorted(5000);

    const randomSorted = randomUnsorted.sort((a, b) => a - b);
    assert.deepEqual(quickSortNew(randomUnsorted), randomSorted);
  });
});

const partition3 = (arr, left, right) => {
  const pivotEl = arr[left];
  let k = left;
  let j = left;
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] <= pivotEl) {
      j++;
      swap(arr, j, i);
      if (arr[j] < pivotEl) {
        k++;
        swap(arr, j, k);
      }
    }
  }
  swap(arr, left, k);
  return [k, j];
};

const quickSort3 = (arr = [], left = 0, right = arr.length - 1) => {
  while (left < right) {
    const k = getRandomInt(left, right);
    swap(arr, left, k);
    const [leftPivotInd, rigthPivotInd] = partition3(arr, left, right);
    if (leftPivotInd - left < right - rigthPivotInd) {
      quickSort3(arr, left, leftPivotInd - 1);
      left = rigthPivotInd + 1;
    } else {
      quickSort3(arr, rigthPivotInd + 1, right);
      right = leftPivotInd - 1;
    }
  }
  return arr;
};

describe('quickSort3', function () {
  it('quickSort3 for [3,1,2,7,74,19,28] should return [1,2,3,7,19,28,74]', function () {
    assert.deepEqual(quickSort3([3, 1, 2, 7, 74, 19, 28]), [1, 2, 3, 7, 19, 28, 74]);
  });

  it('quickSort3 for [-2,10,0,-1,8] should return [-2,-1,0,8,10]', function () {
    assert.deepEqual(quickSort3([-2, 10, 0, -1, 8]), [-2, -1, 0, 8, 10]);
  });

  it('quickSort3 for [1,2,3,4,5] should return [1,2,3,4,5]', function () {
    assert.deepEqual(quickSort3([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
  });

  it('quickSort3 for [5,4,3,2,1] should return [1,2,3,4,5]', function () {
    assert.deepEqual(quickSort3([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
  });

  it('quickSort3 for [8,1,2,3,4,5,6,7] should return [1,2,3,4,5,6,7,8]', function () {
    assert.deepEqual(quickSort3([8, 1, 2, 3, 4, 5, 6, 7]), [1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('quickSort3 for [0,5,7,10,1,6,11] should return [0,1,5,6,7,10,11]', function () {
    assert.deepEqual(quickSort3([0, 5, 7, 10, 1, 6, 11]), [0, 1, 5, 6, 7, 10, 11]);
  });

  it('quickSort3 for [2, 3, 9, 2, 9] should return [2, 2, 3, 9, 9]', function () {
    assert.deepEqual(quickSort3([2, 3, 9, 2, 9]), [2, 2, 3, 9, 9]);
  });

  it('quickSort3 for [0,3] should return [0,3]', function () {
    assert.deepEqual(quickSort3([0, 3]), [0, 3]);
  });

  it('quickSort3 for randomUnsorted should return randomSorted', function () {
    const randomUnsorted = createRanndomUnsorted(5000);

    const randomSorted = randomUnsorted.sort((a, b) => a - b);
    assert.deepEqual(quickSort3(randomUnsorted), randomSorted);
  });
});

const getRandomArr = (minLen, maxLen, minVal, maxVal) =>
  Array.from({ length: getRandomInt(minLen, maxLen) }).map((v, k, arr) => getRandomInt(minVal, maxVal));

function assertRandomTest(randArr) {
  const sorted = randArr.slice().sort((a, b) => a - b);
  it(randArr.join(','), function () {
    assert.deepEqual(quickSort3(randArr), sorted);
  });
}

describe('quickSort3 Stress test', function () {
  for (let i = 0; i < 1000; i++) {
    const randArr = getRandomArr(10, 100, -1000, 1000);
    assertRandomTest(randArr);
  }
});
