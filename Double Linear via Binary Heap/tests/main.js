class MinBinaryHeap {
  constructor(...args) {
    this.values = [];
    args.forEach(item => this.insert(item));
  }

  insert(val) {
    this._bubble(this.values.push(val) - 1);
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
    if ([i, j].some(ind => ind < 0 || ind > this.values.length - 1))
      throw new Error(`Out of the range! Values: ${this.values}, i: ${i}, j: ${j}`);
    if (i === j) return;
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
  }

  print() {
    return this.values.slice();
  }

  get head() {
    return this.values[0];
  }
}

const dbl_linear = n => {
  const seq = [1];
  const toF2 = new MinBinaryHeap(1);
  const toF3 = new MinBinaryHeap(1);
  const f2 = x => 2 * x + 1;
  const f3 = x => 3 * x + 1;
  let last = 1;

  const takeNext = (heap, func) => func(heap.pop());

  while (seq.length < n + 1) {
    while (seq[seq.length - 1] === last) {
      last = 1.5 * toF3.head > toF2.head ? takeNext(toF2, f2) : takeNext(toF3, f3);
    }
    toF2.insert(last);
    toF3.insert(last);
    seq.push(last);
  }

  return seq;
};

var assert = chai.assert;

describe('dbl_linear', function() {
  it('dbl_linear(0) is [1]', function() {
    assert.deepEqual(dbl_linear(0), [1]);
  });

  it('dbl_linear(5) is [1, 3, 4, 7, 9, 10]', function() {
    assert.deepEqual(dbl_linear(5), [1, 3, 4, 7, 9, 10]);
  });

  it('dbl_linear(10) is [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22]', function() {
    assert.deepEqual(dbl_linear(10), [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22]);
  });
});

class Node {
  constructor({ val, priority }) {
    this.val = val;
    this.priority = priority;
  }
}

class MinPriorityQueue {
  constructor(){
      this.values = [];
  }
  insert(val, priority){
      let newNode = new Node({ val, priority });
      this.values.push(newNode);
      this.bubbleUp();
      return this;
  }
  bubbleUp(){
      let idx = this.values.length - 1;
      const element = this.values[idx];
      while(idx > 0){
          let parentIdx = Math.floor((idx - 1)/2);
          let parent = this.values[parentIdx];
          if(element.priority >= parent.priority) break;
          this.values[parentIdx] = element;
          this.values[idx] = parent;
          idx = parentIdx;
      }
  }
  pop(){
      const min = this.values[0];
      const end = this.values.pop();
      if(this.values.length > 0){
          this.values[0] = end;
          this.sinkDown();
      }
      return min;
  }
  sinkDown(){
      let idx = 0;
      const length = this.values.length;
      const element = this.values[0];
      while(true){
          let leftChildIdx = 2 * idx + 1;
          let rightChildIdx = 2 * idx + 2;
          let leftChild,rightChild;
          let swap = null;

          if(leftChildIdx < length){
              leftChild = this.values[leftChildIdx];
              if(leftChild.priority < element.priority) {
                  swap = leftChildIdx;
              }
          }
          if(rightChildIdx < length){
              rightChild = this.values[rightChildIdx];
              if(
                  (swap === null && rightChild.priority < element.priority) || 
                  (swap !== null && rightChild.priority < leftChild.priority)
              ) {
                 swap = rightChildIdx;
              }
          }
          if(swap === null) break;
          this.values[idx] = this.values[swap];
          this.values[swap] = element;
          idx = swap;
      }
  }
}


// class MinPriorityQueue {
//   constructor() {
//     this.values = [];
//   }

//   insert(val, priority) {
//     this._bubble(this.values.push(new Node({ val, priority })) - 1);
//     return this;
//   }

//   pop() {
//     this._swap(0, this.values.length - 1);
//     const min = this.values.pop();
//     this._sink(0);
//     return min;
//   }

//   _bubble(i) {
//     const parentInd = this._getParentInd(i);
//     const parent = Number.isInteger(parentInd) && this.values[parentInd];
//     if (parent && parent.priority > this.values[i].priority) {
//       this._swap(i, parentInd);
//       this._bubble(parentInd);
//     }
//   }

//   _sink(i) {
//     const leftChildInd = 2 * i + 1;
//     if (leftChildInd > this.values.length - 1) return;
//     const indOfGreatestChild = [leftChildInd, leftChildInd + 1].reduce(
//       (result, current) =>
//         this.values[result].priority > (this.values[current] && this.values[current].priority) ? current : result,
//       i
//     );
//     if (indOfGreatestChild !== i) {
//       this._swap(i, indOfGreatestChild);
//       this._sink(indOfGreatestChild);
//     }
//   }

//   _getParentInd(i) {
//     return i > 0 ? Math.floor((i - 1) / 2) : undefined;
//   }

//   _swap(i, j) {
//     if ([i, j].some(ind => ind < 0 || ind > this.values.length - 1))
//       throw new Error(`Out of the range! Values: ${this.values}, i: ${i}, j: ${j}`);
//     if (i === j) return;
//     [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
//   }

//   print() {
//     return this.values.map(node => node.val);
//   }
// }

const pq = new MinPriorityQueue()
  .insert('dizziness', 1)
  .insert('sudden blindness', 5)
  .insert('gunshot', 8)
  .insert('clinic death', 10)
  .insert('hangover', 0)
  .insert('stomach pain', 4)
  .insert('tooth pain', 6)
  .insert('fever', 3)
  .insert('flu', 2);

describe('Min Priority Queue', function() {
  it('pq.pop() is "hangover"', function() {
    assert.equal(pq.pop(), 'hangover');
  });

  it('pq.pop() is "dizziness"', function() {
    assert.equal(pq.pop(), 'dizziness');
  });

  it('pq.pop() is "flu"', function() {
    assert.equal(pq.pop(), 'flu');
  });

  it('pq.pop() is "fever"', function() {
    assert.equal(pq.pop(), 'fever');
  });

  it('pq.pop() is "stomach pain"', function() {
    assert.equal(pq.pop(), 'stomach pain');
  });

  it('pq.pop() is "sudden blindness"', function() {
    assert.equal(pq.pop(), 'sudden blindness');
  });
});

const nLinear = (multipliers, n) => {
  const seq = [1];
  let activeGenerator;

  const createGenerator = multiplier => {
    let f = x => x * multiplier + 1;
    let i = 0;
    let queued = false;

    return {
      generate() {
        if (queued) return;
        queued = true;
        const geneator = this;
        return {
          val: f(seq[i++]),
          dequeue() {
            geneator.dequeue();
          }
        };
      },
      dequeue() {
        queued = false;
        activeGenerator = this;
      }
    };
  };

  const generators = multipliers.map(multiplier => createGenerator(multiplier));

  const queue = new MinPriorityQueue();

  generators.forEach(generator => {
    const { dequeue, val } = generator.generate();
    queue.insert(dequeue, val);
  });

  let doAgain = true;

  for (let i = n; i--; ) {
    doAgain = true;
    do {
      const { val: dequeue, priority: newSeqItem } = queue.pop();
      dequeue();
      if (seq[seq.length - 1] !== newSeqItem) (doAgain = false, seq.push(newSeqItem));

      const generated = activeGenerator.generate();
      queue.insert(generated.dequeue, generated.val);
    } while (doAgain);
  }
  return seq.pop();
};

// while (seq.length < n + 1) {
//   const { val: dequeue, priority: newSeqItem } = queue.pop();
//   dequeue();
//   if (seq[seq.length - 1] !== newSeqItem) seq.push(newSeqItem);
//   console.log("nLinear -> queue.print()", queue.print())

//   const generated = activeGenerator.generate();
//   queue.insert(generated.dequeue, generated.val);
// }
// return seq.pop();
// }



//FIRST VERSION

// const nLinear = (multipliers, n) => {
//   const seq = [1];

//   const createGenerator = multiplier => {
//     let f = x => x * multiplier + 1;
//     let i = 0;
//     let queued = false;

//     return {
//       generate() {
//         if (queued) return;
//         queued = true;
//         const geneator = this;
//         return {
//           val: f(seq[i++]),
//           dequeue() {
//             geneator.dequeue();
//           }
//         };
//       },
//       dequeue() {
//         queued = false;
//       }
//     }
//   }

//   const generators = multipliers.map(multiplier => createGenerator(multiplier));

//   const queue = new MinPriorityQueue();

//   while (seq.length < n + 1) {
//     generators.forEach(generator => {
//       const generated = generator.generate();
//       if (generated) queue.insert(generated.dequeue, generated.val);
//     });

//     const { val: dequeue, priority: newSeqItem } = queue.pop();
//     dequeue();
//     if (seq[seq.length - 1] !== newSeqItem) seq.push(newSeqItem);
//   }
//   return seq.pop();
// }

describe('nLinear', function() {
  it('nLinear([2,3],10) is 22', function() {
    assert.deepEqual(nLinear([2, 3], 10), 22);
  });

  it('nLinear([3,2],10) is 22', function() {
    assert.deepEqual(nLinear([3, 2], 10), 22);
  });

  it('nLinear([2,3],20) is 57', function() {
    assert.deepEqual(nLinear([2, 3], 20), 57);
  });

  it('nLinear([2,3],30) is 91', function() {
    assert.deepEqual(nLinear([2, 3], 30), 91);
  });

  it('nLinear([2,3],40) is 175', function() {
    assert.deepEqual(nLinear([2, 3], 50), 175);
  });

  it('nLinear([2,3],50) is 447', function() {
    assert.deepEqual(nLinear([2, 3], 100), 447);
  });
});
