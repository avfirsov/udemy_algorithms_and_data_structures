const swap = (arr, i, j) => void ([arr[i], arr[j]] = [arr[j], arr[i]]);

const createRanndomUnsorted = n => Array.from({ length: n }, () => Math.random());

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

describe('mergeSorted', function() {
  it('mergeSorted for [2,4,6],[-1,0,1,3,5] should return [-1,0,1,2,3,4,5,6]', function() {
    assert.deepEqual(mergeSorted([2, 4, 6], [-1, 0, 1, 3, 5]), [-1, 0, 1, 2, 3, 4, 5, 6]);
  });

  it('mergeSorted for [0,1,2,3],[4,5,6,7] should return [0,1,2,3,4,5,6,7]', function() {
    assert.deepEqual(mergeSorted([0, 1, 2, 3], [4, 5, 6, 7]), [0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it('mergeSorted for [-1,10,12], [-10,1,11] should return [-10,-1,1,10,11,12]', function() {
    assert.deepEqual(mergeSorted([-1, 10, 12], [-10, 1, 11]), [-10, -1, 1, 10, 11, 12]);
  });

  it('mergeSorted for [0,1,2,3],[1,2,3,4,5] should return [0,1,1,2,2,3,3,4,5]', function() {
    assert.deepEqual(mergeSorted([0, 1, 2, 3], [1, 2, 3, 4, 5]), [0, 1, 1, 2, 2, 3, 3, 4, 5]);
  });
});

const mergeSort = (arr, half = Math.floor(arr.length / 2)) =>
  arr.length > 1 ? mergeSorted(mergeSort(arr.slice(0, half)), mergeSort(arr.slice(half))) : arr;

describe('mergeSort', function() {
  it('mergeSort for [3,1,2,7,74,19,28] should return [1,2,3,7,19,28,74]', function() {
    assert.deepEqual(mergeSort([3, 1, 2, 7, 74, 19, 28]), [1, 2, 3, 7, 19, 28, 74]);
  });

  it('mergeSort for [-2,10,0,-1,8] should return [-2,-1,0,8,10]', function() {
    assert.deepEqual(mergeSort([-2, 10, 0, -1, 8]), [-2, -1, 0, 8, 10]);
  });

  it('mergeSort for [1,2,3,4,5] should return [1,2,3,4,5]', function() {
    assert.deepEqual(mergeSort([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
  });

  it('mergeSort for [5,4,3,2,1] should return [1,2,3,4,5]', function() {
    assert.deepEqual(mergeSort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
  });

  it('mergeSort for [8,1,2,3,4,5,6,7] should return [1,2,3,4,5,6,7,8]', function() {
    assert.deepEqual(mergeSort([8, 1, 2, 3, 4, 5, 6, 7]), [1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('mergeSort for randomUnsorted should return randomSorted', function() {
    assert.deepEqual(mergeSort(randomUnsorted), randomSorted);
  });
});

const clockWork = (size, store = Array.from({ length: size }).fill(0)) => ({
  set(val) {
    const len = store.length;
    for (let i = len - 1; i > len - val - 1; i--) {
      store[i]++;
    }
  },
  get() {
    return store.pop();
  }
});

// const getValue = o => o.value;

const mergeSortedTrackable = (arr1, arr2) => {
  let i = 0,
    j = 0;
  const len1 = arr1.length;
  const len2 = arr2.length;
  let merged = [];
  while (i < len1 && j < len2) {
    arr1[i].value === arr2[j].value
      ? merged.push(arr1[i++], arr2[j++])
      : arr1[i].value < arr2[j].value
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

const mergeSortTrackable = (arr, half = Math.floor(arr.length / 2)) =>
  arr.length > 1
    ? mergeSortedTrackable(mergeSortTrackable(arr.slice(0, half)), mergeSortTrackable(arr.slice(half)))
    : arr;

const convertToTrackable = arr => arr.map((value, i) => ({ from: i, value }));

const getArrDeltaInd = arr => mergeSortTrackable(convertToTrackable(arr)).map((o, i) => i - o.from);

const smaller = arr => {
  console.log(`============== arr = ${arr} ========`);
  const len = arr.length;

  const incrementer = clockWork(len);

  const delta = getArrDeltaInd(arr);
  console.log("TCL: delta", delta)

  const result = Array.from({ length: len }).fill(0);

  for (let i = len - 1; i > -1; i--) {
    const current = delta[i];
    const incrementVal = incrementer.get();
    console.log("TCL: i, current, result[i], incrementVal", i, current, result[i], incrementVal)
    result[i] += incrementVal;
    console.log("TCL: i, current, result[i], incrementVal", i, current, result[i], incrementVal)
    if (current > 0) {
      result[i - current] = current;
      incrementer.set(current - 1);
    }
    console.log("TCL: result", result)
  }
  return result;
};

describe('getArrDeltaInd', function() {
  it('getArrDeltaInd for [1,2,3,4,5] should return [0,0,0,0,0]', function() {
    assert.deepEqual(getArrDeltaInd([1, 2, 3, 4, 5]), [0, 0, 0, 0, 0]);
  });

  it('getArrDeltaInd for [1,4,3,2,5] should return [0,-2,0,2,0]', function() {
    assert.deepEqual(getArrDeltaInd([1, 4, 3, 2, 5]), [0, -2, 0, 2, 0]);
  });

  it('getArrDeltaInd for [5,4,3,2,1] should return [-4,-2,0,2,4]', function() {
    assert.deepEqual(getArrDeltaInd([5, 4, 3, 2, 1]), [-4, -2, 0, 2, 4]);
  });

  it('getArrDeltaInd for [1,3,4,5,2] should return [0,-3,1,1,1]', function() {
    assert.deepEqual(getArrDeltaInd([1, 3, 4, 5, 2]), [0, -3, 1, 1, 1]);
  });
});

describe('smaller', function() {
  it('smaller for [1,2,3,4,5] should return [0,0,0,0,0]', function() {
    assert.deepEqual(smaller([1, 2, 3, 4, 5]), [0, 0, 0, 0, 0]);
  });

  it('smaller for [1,4,3,2,5] should return [0,-2,0,2,0]', function() {
    assert.deepEqual(smaller([1, 4, 3, 2, 5]), [0, 2, 1, 0, 0]);
  });

  it('smaller for [5,4,3,2,1] should return [-4,-2,0,2,4]', function() {
    assert.deepEqual(smaller([5, 4, 3, 2, 1]), [4, 3, 2, 1, 0]);
  });

  it('smaller for [1,3,4,5,2] should return [0,-3,1,1,1]', function() {
    assert.deepEqual(smaller([1, 3, 4, 5, 2]), [0, 1, 1, 1, 0]);
  });

  it('smaller for [1, 1, -1, 0, 0] should return [3, 3, 0, 0, 0]', function() {
    assert.deepEqual(smaller([1, 1, -1, 0, 0]), [3, 3, 0, 0, 0]);
  });

  it('smaller for [5, 4, 7, 9, 2, 4, 4, 5, 6] should return [4, 1, 5, 5, 0, 0, 0, 0, 0]', function() {
    assert.deepEqual(smaller([5, 4, 7, 9, 2, 4, 4, 5, 6]), [4, 1, 5, 5, 0, 0, 0, 0, 0]);
  });
});


