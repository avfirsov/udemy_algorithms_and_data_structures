class MaxBinaryHeap {
  constructor(...args) {
    this.values = [];
    args.forEach((item) => this.insert(item));
  }

  insert(value) {
    this._bubble(this.values.push(value) - 1);
    return this;
  }

  pop() {
    this._swap(0, this.values.length - 1);
    const max = this.values.pop();
    this._sink(0);
    return max;
  }

  _bubble(i) {
    const parentInd = this._getParentInd(i);
    const parent = Number.isInteger(parentInd) && this.values[parentInd];
    if (parent && parent < this.values[i]) {
      this._swap(i, parentInd);
      this._bubble(parentInd);
    }
  }

  _sink(i) {
    const leftChildInd = 2 * i + 1;
    if (leftChildInd > this.values.length - 1) return;
    const indOfGreatestChild = [leftChildInd, leftChildInd + 1].reduce(
      (result, current) => (this.values[result] < this.values[current] ? current : result),
      i
    );
    if (indOfGreatestChild !== i) {
      this._swap(i, indOfGreatestChild);
      this._sink(indOfGreatestChild);
    }
  }

  _getParentInd(i) {
    return i > 0 ? Math.floor((i - 1) / 2) : undefined;
  }

  _swap(i, j) {
    if ([i, j].some((ind) => ind < 0 || ind > this.values.length - 1))
      throw new Error(`Out of the range! Values: ${this.values}, i: ${i}, j: ${j}`);
    if (i === j) return;
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
  }

  print() {
    return this.values.slice();
  }
}

var assert = chai.assert;

const bh = new MaxBinaryHeap();
const bhPop = new MaxBinaryHeap(41, 39, 33, 18, 27, 12);

describe('bh.insert(14).insert(18).insert(33).insert(26).insert(31).insert(100)', function () {
  before(function () {
    bh.insert(14).insert(18).insert(33).insert(26).insert(31).insert(100);
  });

  it('bh.print() is [100,31,33,14,26,18]', function () {
    assert.deepEqual(bh.print(), [100, 31, 33, 14, 26, 18]);
  });

  it('bh.pop() is 100', function () {
    assert.equal(bh.pop(), 100);
  });

  it('bh.print() is [33,31,18,14,26]', function () {
    assert.deepEqual(bh.print(), [33, 31, 18, 14, 26]);
  });

  it('bhPop.pop() is 41', function () {
    assert.equal(bhPop.pop(), 41);
  });

  it('bhPop.print() is [39,27,33,18,12]', function () {
    assert.deepEqual(bhPop.print(), [39, 27, 33, 18, 12]);
  });
});

class Node {
  constructor({ value, priority }) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor(...args) {
    this.values = [];
    args.forEach((item) => this.insert(item));
  }

  insert(node) {
    this._bubble(this.values.push(node) - 1);
    return this;
  }

  pop() {
    this._swap(0, this.values.length - 1);
    const max = this.values.pop();
    this._sink(0);
    return max.value;
  }

  _bubble(i) {
    const parentInd = this._getParentInd(i);
    const parent = Number.isInteger(parentInd) && this.values[parentInd];
    if (parent && parent.priority < this.values[i].priority) {
      this._swap(i, parentInd);
      this._bubble(parentInd);
    }
  }

  _sink(i) {
    const leftChildInd = 2 * i + 1;
    if (leftChildInd > this.values.length - 1) return;
    const indOfGreatestChild = [leftChildInd, leftChildInd + 1].reduce(
      (result, current) =>
        this.values[result].priority < (this.values[current] && this.values[current].priority) ? current : result,
      i
    );
    if (indOfGreatestChild !== i) {
      this._swap(i, indOfGreatestChild);
      this._sink(indOfGreatestChild);
    }
  }

  _getParentInd(i) {
    return i > 0 ? Math.floor((i - 1) / 2) : undefined;
  }

  _swap(i, j) {
    if ([i, j].some((ind) => ind < 0 || ind > this.values.length - 1))
      throw new Error(`Out of the range! Values: ${this.values}, i: ${i}, j: ${j}`);
    if (i === j) return;
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
  }

  print() {
    return this.values.map((node) => node.value);
  }
}

const pq = new PriorityQueue(
  { value: 'dizziness', priority: 1 },
  { value: 'sudden blindness', priority: 5 },
  { value: 'gunshot', priority: 8 },
  { value: 'clinic death', priority: 10 },
  { value: 'hangover', priority: 1 },
  { value: 'stomach pain', priority: 4 },
  { value: 'tooth pain', priority: 3 },
  { value: 'fever', priority: 3 },
  { value: 'flu', priority: 2 }
);

describe('Priority Queue', function () {
  it('pq.pop() is "clinic death"', function () {
    assert.equal(pq.pop(), 'clinic death');
  });

  it('pq.pop() is "gunshot"', function () {
    assert.equal(pq.pop(), 'gunshot');
  });

  it('pq.pop() is "sudden blindness"', function () {
    assert.equal(pq.pop(), 'sudden blindness');
  });

  it('pq.pop() is "stomach pain"', function () {
    assert.equal(pq.pop(), 'stomach pain');
  });

  it('pq.print() is ["fever", "flu", "tooth pain", "dizziness", "hangover"]', function () {
    assert.deepEqual(pq.print(), ['fever', 'flu', 'tooth pain', 'dizziness', 'hangover']);
  });
});

class MinBinaryHeap {
  constructor(...args) {
    this.values = [];
    args.forEach((item) => this.insert(item));
  }

  insert(value) {
    this._bubble(this.values.push(value) - 1);
    return this;
  }

  pop() {
    this._swap(0, this.values.length - 1);
    const max = this.values.pop();
    this._sink(0);
    return max;
  }

  _bubble(i) {
    const parentInd = this._getParentInd(i);
    const parent = Number.isInteger(parentInd) && this.values[parentInd];
    if (parent && parent > this.values[i]) {
      this._swap(i, parentInd);
      this._bubble(parentInd);
    }
  }

  _sink(i) {
    const leftChildInd = 2 * i + 1;
    if (leftChildInd > this.values.length - 1) return;
    const indOfGreatestChild = [leftChildInd, leftChildInd + 1].reduce(
      (result, current) => (this.values[result] > this.values[current] ? current : result),
      i
    );
    if (indOfGreatestChild !== i) {
      this._swap(i, indOfGreatestChild);
      this._sink(indOfGreatestChild);
    }
  }

  _getParentInd(i) {
    return i > 0 ? Math.floor((i - 1) / 2) : undefined;
  }

  _swap(i, j) {
    if ([i, j].some((ind) => ind < 0 || ind > this.values.length - 1))
      throw new Error(`Out of the range! Values: ${this.values}, i: ${i}, j: ${j}`);
    if (i === j) return;
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
  }

  print() {
    return this.values.slice();
  }
}

const mbh = new MinBinaryHeap();
const mbhPop = new MinBinaryHeap(41, 39, 33, 18, 27, 12);

describe('mbh.insert(14).insert(18).insert(33).insert(26).insert(31).insert(100)', function () {
  before(function () {
    mbh.insert(14).insert(18).insert(33).insert(26).insert(31).insert(100);
  });

  it('mbh.print() is [14,18,33,26,31,100]', function () {
    assert.deepEqual(mbh.print(), [14, 18, 33, 26, 31, 100]);
  });

  it('mbh.pop() is 14', function () {
    assert.equal(mbh.pop(), 14);
  });

  it('mbh.print() is [18,26,33,100,31]', function () {
    assert.deepEqual(mbh.print(), [18, 26, 33, 100, 31]);
  });

  it('mbhPop.pop() is 12', function () {
    assert.equal(mbhPop.pop(), 12);
  });

  it('mbhPop.print() is [18,27,39,41,33]', function () {
    assert.deepEqual(mbhPop.print(), [18, 27, 39, 41, 33]);
  });
});

class MinPriorityQueue {
  constructor(...args) {
    this.values = [];
    args.forEach((item) => this.enqueue(item));
  }

  enqueue({ value, priority }) {
    this._bubble(this.values.push(new Node({ value: value, priority })) - 1);
    return this;
  }

  dequeue() {
    this._swap(0, this.values.length - 1);
    const min = this.values.pop();
    this._sink(0);
    return min;
  }

  _bubble(i) {
    const parentInd = this._getParentInd(i);
    const parent = Number.isInteger(parentInd) && this.values[parentInd];
    if (parent && parent.priority > this.values[i].priority) {
      this._swap(i, parentInd);
      this._bubble(parentInd);
    }
  }

  _sink(i) {
    const leftChildInd = 2 * i + 1;
    if (leftChildInd > this.values.length - 1) return;
    const indOfGreatestChild = [leftChildInd, leftChildInd + 1].reduce(
      (result, current) =>
        this.values[current] && this.values[result].priority > this.values[current].priority ? current : result,
      i
    );
    if (indOfGreatestChild !== i) {
      this._swap(i, indOfGreatestChild);
      this._sink(indOfGreatestChild);
    }
  }

  _getParentInd(i) {
    return i > 0 ? Math.floor((i - 1) / 2) : undefined;
  }

  _swap(i, j) {
    if ([i, j].some((ind) => ind < 0 || ind > this.values.length - 1))
      throw new Error(`Out of the range! Values: ${this.values}, i: ${i}, j: ${j}`);
    if (i === j) return;
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
  }

  print() {
    return this.values.slice();
  }
}

const MPQ = new MinPriorityQueue();

MPQ.enqueue({ value: '10', priority: 10 });
MPQ.enqueue({ value: '5', priority: 5 });
MPQ.enqueue({ value: '8', priority: 8 });
MPQ.enqueue({ value: '1', priority: 1 });
MPQ.enqueue({ value: '0', priority: 0 });
MPQ.enqueue({ value: '3', priority: 3 });
MPQ.enqueue({ value: '7', priority: 7 });

describe('MinPriorityQueue', function () {
  it('MPQ.dequeue().value is 0', function () {
    assert.equal(MPQ.dequeue().value, 0);
  });
  it('MPQ.dequeue().value is 1', function () {
    assert.equal(MPQ.dequeue().value, 1);
  });
  it('MPQ.dequeue().value is 3', function () {
    assert.equal(MPQ.dequeue().value, 3);
  });
  it('MPQ.dequeue().value is 5', function () {
    assert.equal(MPQ.dequeue().value, 5);
  });
  it('MPQ.dequeue().value is 7', function () {
    assert.equal(MPQ.dequeue().value, 7);
  });
  it('MPQ.dequeue().value is 8', function () {
    assert.equal(MPQ.dequeue().value, 8);
  });
  it('MPQ.dequeue().value is 10', function () {
    assert.equal(MPQ.dequeue().value, 10);
  });
});
