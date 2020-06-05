class Node {
  constructor({ val, lesserThan, count, memo }) {
    this.val = val;
    this.lesserThan = lesserThan || 0;
    this.count = count || 0;
    this.memo = memo || 0;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTreeWithCount {
  constructor() {
    this.root = null;
  }

  insert(val) {
    if (!this.root) {
      this.root = new Node({ val, count: 1 });

      this.insert = val => {
        let currentNode;
        let nextNode = this.root;
        let direction;

        while (nextNode.val !== val) {
          direction = nextNode.val > val ? 'left' : 'right';

          currentNode = nextNode;

          nextNode = currentNode[direction] || (currentNode[direction] = new Node({ val }));
          if (direction === 'right') {
            const currentSum = currentNode.count + currentNode.lesserThan;
            nextNode.lesserThan += currentSum - nextNode.memo;
            nextNode.memo = currentSum;
          } else {
            nextNode.lesserThan += currentNode.lesserThan - nextNode.memo;
            nextNode.memo = ++currentNode.lesserThan;
          }
        }

        nextNode.count++;
        return nextNode.lesserThan;
      };

      return 0;
    }
  }
}

var assert = chai.assert;

const bstWithCount = new BinarySearchTreeWithCount();
describe('bstWithCount', function() {
  it('bstWithCount.insert(6) returns 0', function() {
    assert.equal(bstWithCount.insert(6), 0);
  });

  it('bstWithCount.insert(5) returns 0', function() {
    assert.equal(bstWithCount.insert(5), 0);
  });

  it('bstWithCount.insert(4) returns 0', function() {
    assert.equal(bstWithCount.insert(4), 0);
  });

  it('bstWithCount.insert(4) returns 0', function() {
    assert.equal(bstWithCount.insert(4), 0);
  });

  it('bstWithCount.insert(2) returns 0', function() {
    assert.equal(bstWithCount.insert(2), 0);
  });

  it('bstWithCount.insert(9) returns 5', function() {
    assert.equal(bstWithCount.insert(9), 5);
  });

  it('bstWithCount.insert(7) returns 5', function() {
    assert.equal(bstWithCount.insert(7), 5);
  });

  it('bstWithCount.insert(4) returns 1', function() {
    assert.equal(bstWithCount.insert(4), 1);
  });

  it('bstWithCount.insert(5) returns 4', function() {
    assert.equal(bstWithCount.insert(5), 4);
  });
});

const smaller = arr => {
  const bst = new BinarySearchTreeWithCount();
  const len = arr.length;
  for (let i = len - 1; i > -1; i--) {
    arr[i] = bst.insert(arr[i]);
  }
  return arr;
};

const smallerSolution = arr => arr.map((v, i) => arr.slice(i).filter(c => c < v).length);

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomArr = (length, min, max) => Array.from({ length }, () => getRandomInt(min, max));

const coverWithPromise = async val => Promise.resolve(val);

const generateRandomArrAsync = async (length, min, max) => coverWithPromise(generateRandomArr(length, min, max));

function itShouldWorkForRandomArr(randomArr) {
  it('should work for [' + randomArr + ']', function() {
    assert.deepEqual(smaller(randomArr.slice()), smallerSolution(randomArr.slice()));
  });
}

describe('tests from codewars', function() {
  it('smaller([5, 4, 7, 9, 2, 4, 4, 5, 6]), [4, 1, 5, 5, 0, 0, 0, 0, 0])', function() {
    assert.deepEqual(smaller([5, 4, 7, 9, 2, 4, 4, 5, 6]), [4, 1, 5, 5, 0, 0, 0, 0, 0]);
  });

  it('smallerSolution([5, 4, 7, 9, 2, 4, 4, 5, 6]), [4, 1, 5, 5, 0, 0, 0, 0, 0])', function() {
    assert.deepEqual(smallerSolution([5, 4, 7, 9, 2, 4, 4, 5, 6]), [4, 1, 5, 5, 0, 0, 0, 0, 0]);
  });
});

describe('Smaller via BST', function() {
  for (let i = 0; i < 100; i++) {
    const randomArr = generateRandomArr(100, -1000, 1000).slice();
    itShouldWorkForRandomArr(randomArr);
  }
});

describe('failed tests', function() {
  it('should work for [-1,6,-10,0,-6]', function() {
    assert.deepEqual(smaller([-1, 6, -10, 0, -6]), smallerSolution([-1, 6, -10, 0, -6]));
  });

  it('should work for [-2,-7,-6,-7,0]', function() {
    assert.deepEqual(smaller([-2, -7, -6, -7, 0]), smallerSolution([-2, -7, -6, -7, 0]));
  });

  it('should work for [7,5,7,-10,2]', function() {
    assert.deepEqual(smaller([7, 5, 7, -10, 2]), smallerSolution([7, 5, 7, -10, 2]));
  });

  it('should work for [3,-9,-4,0,-5]', function() {
    assert.deepEqual(smaller([3, -9, -4, 0, -5]), smallerSolution([3, -9, -4, 0, -5]));
  });

  it('should work for [6,-2,7,8,-2]', function() {
    assert.deepEqual(smaller([6, -2, 7, 8, -2]), smallerSolution([6, -2, 7, 8, -2]));
  });

  it('should work for [-2,4,-7,7,-10,-7,-4,0,5,-9]', function() {
    assert.deepEqual(
      smaller([-2, 4, -7, 7, -10, -7, -4, 0, 5, -9]),
      smallerSolution([-2, 4, -7, 7, -10, -7, -4, 0, 5, -9])
    );
  });
});
