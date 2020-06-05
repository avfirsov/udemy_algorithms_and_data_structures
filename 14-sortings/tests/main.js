const swap = (arr, i, j) => void ([arr[i], arr[j]] = [arr[j], arr[i]]);

const bubbleSort = arr => {
  let counter = 0;
  const len = arr.length;
  let noswap;
  for (let i = len; i > 0; i--) {
    noswap = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j + 1] < arr[j]) (swap(arr, j + 1, j), noswap = false);
      counter++;
    }
    if (noswap) break;
  }
  console.log('iterations: ', counter);
  counter = 0;
  return arr;
}


var assert = chai.assert;


describe('bubbleSort', function() {
  it("bubbleSort for [3,1,2,7,74,19,28] should return [1,2,3,7,19,28,74]", function() {
    assert.equal(bubbleSort([3,1,2,7,74,19,28]), [1,2,3,7,19,28,74]);
  });

  it("bubbleSort for [-2,10,0,-1,8] should return [-2,-1,0,8,10]", function() {
    assert.equal(bubbleSort([-2,10,0,-1,8]), [-2,-1,0,8,10]);
  });

  it("bubbleSort for [1,2,3,4,5] should return [1,2,3,4,5]", function() {
    assert.equal(bubbleSort([1,2,3,4,5]), [1,2,3,4,5]);
  });

  it("bubbleSort for [5,4,3,2,1] should return [1,2,3,4,5]", function() {
    assert.equal(bubbleSort([5,4,3,2,1]), [1,2,3,4,5]);
  });

  it("bubbleSort for [8,1,2,3,4,5,6,7] should return [1,2,3,4,5,6,7,8]", function() {
    assert.equal(bubbleSort([8,1,2,3,4,5,6,7]), [1,2,3,4,5,6,7,8]);
  });

});


const selectionSort = arr => {
  let counter = 0;
  const len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    let maxInd = i;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[maxInd])  maxInd = j;
      counter++;
    }
    swap(arr, i, maxInd);
  }
  console.log('iterations: ', counter);
  counter = 0;
  return arr;
}

describe('selectionSort', function() {
  it("selectionSort for [3,1,2,7,74,19,28] should return [1,2,3,7,19,28,74]", function() {
    assert.equal(selectionSort([3,1,2,7,74,19,28]), [1,2,3,7,19,28,74]);
  });

  it("selectionSort for [-2,10,0,-1,8] should return [-2,-1,0,8,10]", function() {
    assert.equal(selectionSort([-2,10,0,-1,8]), [-2,-1,0,8,10]);
  });

  it("selectionSort for [1,2,3,4,5] should return [1,2,3,4,5]", function() {
    assert.equal(selectionSort([1,2,3,4,5]), [1,2,3,4,5]);
  });

  it("selectionSort for [5,4,3,2,1] should return [1,2,3,4,5]", function() {
    assert.equal(selectionSort([5,4,3,2,1]), [1,2,3,4,5]);
  });

  it("selectionSort for [8,1,2,3,4,5,6,7] should return [1,2,3,4,5,6,7,8]", function() {
    assert.equal(selectionSort([8,1,2,3,4,5,6,7]), [1,2,3,4,5,6,7,8]);
  });

});



const insertionSort = arr => {
  let counter = 0;
  const len = arr.length;
  let lastSortedItem, i;
  for (lastSortedItem = 0; lastSortedItem < len - 1; lastSortedItem++) {
    let curVal = arr[lastSortedItem + 1];
    counter++;
    for (i = lastSortedItem + 1; i > 0 && arr[i-1] > curVal; i--) {
      counter++;
      arr[i] = arr[i-1];
    }
    arr[i] = curVal;
  }
  console.log('iterations: ', counter);
  counter = 0;
  return arr;
}

describe('insertionSort', function() {
  it("insertionSort for [3,1,2,7,74,19,28] should return [1,2,3,7,19,28,74]", function() {
    assert.equal(insertionSort([3,1,2,7,74,19,28]), [1,2,3,7,19,28,74]);
  });

  it("insertionSort for [-2,10,0,-1,8] should return [-2,-1,0,8,10]", function() {
    assert.equal(insertionSort([-2,10,0,-1,8]), [-2,-1,0,8,10]);
  });

  it("insertionSort for [1,2,3,4,5] should return [1,2,3,4,5]", function() {
    assert.equal(insertionSort([1,2,3,4,5]), [1,2,3,4,5]);
  });

  it("insertionSort for [5,4,3,2,1] should return [1,2,3,4,5]", function() {
    assert.equal(insertionSort([5,4,3,2,1]), [1,2,3,4,5]);
  });

  it("insertionSort for [8,1,2,3,4,5,6,7] should return [1,2,3,4,5,6,7,8]", function() {
    assert.equal(insertionSort([8,1,2,3,4,5,6,7]), [1,2,3,4,5,6,7,8]);
  });

});