class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    const list = this.adjacencyList;
    if (!list[vertex]) list[vertex] = [];
  }

  addEdge(v1, v2) {
    const list = this.adjacencyList;
    list[v1].push(v2);
    list[v2].push(v1);
  }

  removeEdge(v1, v2) {
    const list = this.adjacencyList;
    list[v1] = list[v1].filter((vertex) => vertex != v2);
    list[v2] = list[v2].filter((vertex) => vertex != v1);
  }

  removeVertex(vertex) {
    const hasConnectionWith = this.adjacencyList[vertex];
    hasConnectionWith.forEach((vertexPaired) => {
      this.removeEdge(vertexPaired, vertex);
    });

    delete this.adjacencyList[vertex];
  }

  recursiveDFS() {
    const visited = new Set();
    const list = this.adjacencyList;

    (function helper(vertex) {
      if (visited.has(vertex)) return;
      visited.add(vertex);
      list[vertex].forEach((vertexPaired) => helper(vertexPaired));
    })(Object.keys(list)[0]);

    return [...visited];
  }

  iterativeDFS() {
    const list = this.adjacencyList;
    //should be Stack
    const toVisit = [Object.keys(list)[0]];
    const result = new Set();

    while (toVisit.length) {
      const next = toVisit.pop();
      if (result.has(next)) continue;
      result.add(next);
      toVisit.push(...list[next]);
    }

    return [...result];
  }

  iterativeBFS() {
    const list = this.adjacencyList;
    //should be Queue
    const toVisit = [Object.keys(list)[0]];
    const result = new Set();

    while (toVisit.length) {
      const next = toVisit.shift();
      if (result.has(next)) continue;
      result.add(next);
      toVisit.push(...list[next]);
    }

    return [...result];
  }

  recursiveBFS() {
    const visited = new Set();
    const list = this.adjacencyList;

    (function helper(vertex) {
      visited.add(vertex);
      list[vertex].forEach(
        (vertexPaired) => !visited.has(vertexPaired) && (visited.add(vertexPaired), helper(vertexPaired))
      );
    })(Object.keys(list)[0]);

    return [...visited];
  }
}

const g = new Graph();
g.addVertex('JS');
g.addVertex('Java');
g.addVertex('Scala');
g.addVertex('Delphi');
g.addVertex('Pascal');
g.addVertex('C');
g.addVertex('Clojure');
g.addVertex('F#');
g.addVertex('Assembly');
g.addVertex('Swift');
g.addVertex('Kotlin');

g.addEdge('JS', 'Java');
g.addEdge('JS', 'Scala');
g.addEdge('Java', 'Scala');
g.addEdge('JS', 'Pascal');
g.addEdge('Delphi', 'Pascal');
g.addEdge('Pascal', 'C');
g.addEdge('C', 'Clojure');
g.addEdge('F#', 'Clojure');
g.addEdge('F#', 'Assembly');
g.addEdge('Swift', 'Assembly');
g.addEdge('Swift', 'Kotlin');

class Node {
  constructor({ value, priority }) {
    this.value = value;
    this.priority = priority;
  }
}

class MinPriorityQueue {
  constructor(...args) {
    this.values = [];
    args.forEach((item) => this.enqueue(item));
  }

  enqueue(value, priority) {
    this._bubble(this.values.push(new Node({ value, priority })) - 1);
    return this;
  }

  dequeue() {
    this._swap(0, this.values.length - 1);
    const min = this.values.pop();
    this._sink(0);
    return min.value;
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


class WeightenedGraph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    this.adjacencyList.set(vertex, new Map());
  }

  addEdge(v1, v2, weight) {
    const list = this.adjacencyList;
    list.get(v1).set(v2, weight);
    list.get(v2).set(v1, weight);
  }

  Dijkstra(from, to) {
    const path = [];

    const { previous, distances } = this.getShortestDistancesFromVertex(from, to);

    let next = to;
    while (next != from) {
      path.push(next);
      next = previous[next];
    }

    path.push(from);

    return { path: path.reverse(), distance: distances[to] };
  }

  getShortestDistancesFromVertex(from, to) {
    const list = this.adjacencyList;
    const previous = {};
    const distances = {};
    const nodes = new MinPriorityQueue();

    [...list.keys()].forEach((vertex) => {
      if (vertex == from) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
        return;
      }
      distances[vertex] = Infinity;
      nodes.enqueue(vertex, Infinity);
      previous[vertex] = null;
    });

    const updateDistance = (v, newVal, from) => {
      distances[v] = newVal;
      previous[v] = from;
      nodes.enqueue(v, newVal);
    };

    while (nodes.values.length) {
      const smallest = nodes.dequeue();
      if (smallest == to) {
        return { previous, distances };
      }

      const distanceToSmallest = distances[smallest];

      if (distanceToSmallest == Infinity) {
        throw new Error('Something went wrong - got Infinity');
      }

      const neighboursMap = list.get(smallest);
      const neighbours = [...neighboursMap.keys()];
      neighbours.forEach((neighbour) => {
        const distanceMaybe = neighboursMap.get(neighbour) + distanceToSmallest;
        if (distanceMaybe < distances[neighbour]) {
          updateDistance(neighbour, distanceMaybe, smallest);
        }
      });
    }

    return { previous, distances };
  }
}

const gw = new WeightenedGraph();

gw.addVertex('A');
gw.addVertex('B');
gw.addVertex('C');
gw.addVertex('D');
gw.addVertex('E');
gw.addVertex('F');

gw.addEdge('A', 'B', 4);
gw.addEdge('E', 'B', 3);
gw.addEdge('A', 'C', 2);
gw.addEdge('C', 'D', 2);
gw.addEdge('E', 'D', 3);
gw.addEdge('F', 'D', 1);
gw.addEdge('C', 'F', 4);
gw.addEdge('E', 'F', 1);

var assert = chai.assert;

// describe("DoubleLinkedList created by new DoubleLinkedList('first', 'second', 'third', 'forth')", function() {
//   it('length is 4', function() {
//     assert.equal(test.length, 4);
//   });

//   it('head is "first"', function() {
//     assert.equal(test.head.val, 'first');
//   });

//   it('tail is "forth"', function() {
//     assert.equal(test.tail.val, 'forth');
//   });

//   it('head.next is "second"', function() {
//     assert.equal(test.head.next.val, 'second');
//   });

//   it('head.next.next is "third"', function() {
//     assert.equal(test.head.next.next.val, 'third');
//   });
// });

// describe("test.push('fifth')", function() {
//   let returned;
//   before(function() {
//     returned = test.push('fifth');
//   });

//   it('length is 5', function() {
//     assert.equal(test.length, 5);
//   });

//   it('forth element is "forth"', function() {
//     assert.equal(test.head.next.next.next.val, 'forth');
//   });

//   it('tail is "fifth"', function() {
//     assert.equal(test.tail.val, 'fifth');
//   });

//   it('returned is test itself', function() {
//     assert.equal(returned, test);
//   });
// });

// describe("test.push('sixth', 'seventh')", function() {
//   let returned;
//   before(function() {
//     returned = test.push('sixth', 'seventh');
//   });

//   it('length is 7', function() {
//     assert.equal(test.length, 7);
//   });

//   it('before tail is "sixth"', function() {
//     assert.equal(test.head.next.next.next.next.next.val, 'sixth');
//   });

//   it('tail is "seventh"', function() {
//     assert.equal(test.tail.val, 'seventh');
//   });

//   it('returned is test itself', function() {
//     assert.equal(returned, test);
//   });
// });

// describe('test.pop()', function() {
//   let returned;
//   before(function() {
//     returned = test.pop();
//   });

//   it('length is 6', function() {
//     assert.equal(test.length, 6);
//   });

//   it('forth element is "forth"', function() {
//     assert.equal(test.head.next.next.next.val, 'forth');
//   });

//   it('tail is "sixth"', function() {
//     assert.equal(test.tail.val, 'sixth');
//   });

//   it('returned "seventh"', function() {
//     assert.equal(returned.val, 'seventh');
//   });
// });

// describe('test.shift()', function() {
//   let returned;
//   before(function() {
//     returned = test.shift();
//   });

//   it('length is 5', function() {
//     assert.equal(test.length, 5);
//   });

//   it('head is "second"', function() {
//     assert.equal(test.head.val, 'second');
//   });

//   it('forth element is "fifth"', function() {
//     assert.equal(test.head.next.next.next.val, 'fifth');
//   });

//   it('tail is "sixth"', function() {
//     assert.equal(test.tail.val, 'sixth');
//   });

//   it('returned "first"', function() {
//     assert.equal(returned.val, 'first');
//   });
// });

// describe("test.shift(); test.unshift('second', 'first')", function() {
//   let returned;
//   before(function() {
//     test.shift();
//     returned = test.unshift('second', 'first');
//   });

//   it('length is 6', function() {
//     assert.equal(test.length, 6);
//   });

//   it('forth element is "forth"', function() {
//     assert.equal(test.head.next.next.next.val, 'forth');
//   });

//   it('tail is "sixth"', function() {
//     assert.equal(test.tail.val, 'sixth');
//   });

//   it('returned test itself', function() {
//     assert.equal(returned, test);
//   });
// });

// describe('test.get(i)', function() {
//   it('test.get(0) is "first"', function() {
//     assert.equal(test.get(0).val, 'first');
//   });

//   it('test.get(-1) is null', function() {
//     assert.equal(test.get(-1), null);
//   });

//   it('test.get(100) is null', function() {
//     assert.equal(test.get(100), null);
//   });

//   it('test.get(2) is "third"', function() {
//     assert.equal(test.get(2).val, 'third');
//   });

//   it('test.get(5) is "sixth"', function() {
//     assert.equal(test.get(5).val, 'sixth');
//   });
// });

// describe("test.set(i, test.get(i) + ' edited')", function() {
//   before(function() {
//     [0, 1, 2, 3, 4, 5].forEach(i => test.set(i, test.get(i).val + ' edited'));
//   });

//   it('test.get(0) is "first edited"', function() {
//     assert.equal(test.get(0).val, 'first edited');
//   });

//   it('test.get(-1) is null', function() {
//     assert.equal(test.get(-1), null);
//   });

//   it('test.get(100) is null', function() {
//     assert.equal(test.get(100), null);
//   });

//   it('test.get(2) is "third edited"', function() {
//     assert.equal(test.get(2).val, 'third edited');
//   });

//   it('test.get(5) is "sixth edited"', function() {
//     assert.equal(test.get(5).val, 'sixth edited');
//   });
// });

// describe("test.insert(i, 'after ' + test.get(i))", function() {
//   before(function() {
//     [1, 3, 5, 7, 9, 11].forEach(i => test.insert(i, 'after ' + test.get(i - 1).val));
//   });

//   it('length is 12', function() {
//     assert.equal(test.length, 12);
//   });

//   it('test.head is "first edited"', function() {
//     assert.equal(test.head.val, 'first edited');
//   });

//   it('test.get(1) is "after first edited"', function() {
//     assert.equal(test.get(1).val, 'after first edited');
//   });

//   it('test.get(-1) is null', function() {
//     assert.equal(test.get(-1), null);
//   });

//   it('test.get(100) is null', function() {
//     assert.equal(test.get(100), null);
//   });

//   it('test.get(3) is "after second edited"', function() {
//     assert.equal(test.get(3).val, 'after second edited');
//   });

//   it('test.tail is "after sixth edited"', function() {
//     assert.equal(test.tail.val, 'after sixth edited');
//   });
// });

// describe('[11,9,7,5,3,1].forEach(i => test.remove(i))', function() {
//   before(function() {
//     [11, 9, 7, 5, 3, 1].forEach(i => test.remove(i));
//   });

//   it('length is 6', function() {
//     assert.equal(test.length, 6);
//   });

//   it('test.head is "first edited"', function() {
//     assert.equal(test.head.val, 'first edited');
//   });

//   it('test.get(1) is "second edited"', function() {
//     assert.equal(test.get(1).val, 'second edited');
//   });

//   it('test.get(-1) is null', function() {
//     assert.equal(test.get(-1), null);
//   });

//   it('test.get(100) is null', function() {
//     assert.equal(test.get(100), null);
//   });

//   it('test.get(3) is "forth edited"', function() {
//     assert.equal(test.get(3).val, 'forth edited');
//   });

//   it('test.tail is "sixth edited"', function() {
//     assert.equal(test.tail.val, 'sixth edited');
//   });
// });

// describe('test.reverse()', function() {
//   before(function() {
//     test.reverse();
//   });

//   it('length is 6', function() {
//     assert.equal(test.length, 6);
//   });

//   it('test.head is "sixth edited"', function() {
//     assert.equal(test.head.val, 'sixth edited');
//   });

//   it('test.get(1) is "fifth edited"', function() {
//     assert.equal(test.get(1).val, 'fifth edited');
//   });

//   it('test.get(-1) is null', function() {
//     assert.equal(test.get(-1), null);
//   });

//   it('test.get(100) is null', function() {
//     assert.equal(test.get(100), null);
//   });

//   it('test.get(3) is "third edited"', function() {
//     assert.equal(test.get(3).val, 'third edited');
//   });

//   it('test.tail is "first edited"', function() {
//     assert.equal(test.tail.val, 'first edited');
//   });

//   it('test.tail.prev is "second edited"', function() {
//     assert.equal(test.tail.prev.val, 'second edited');
//   });

//   it('test.tail.prev.prev.val is "third edited"', function() {
//     assert.equal(test.tail.prev.prev.val, 'third edited');
//   });

//   it('test.tail.prev.prev.prev.val is "forth edited"', function() {
//     assert.equal(test.tail.prev.prev.prev.val, 'forth edited');
//   });

//   it('test.tail.prev.prev.prev.prev.val is "fifth edited"', function() {
//     assert.equal(test.tail.prev.prev.prev.prev.val, 'fifth edited');
//   });

//   it('test.tail.prev.prev.prev.prev.prev.val is "sixth edited"', function() {
//     assert.equal(test.tail.prev.prev.prev.prev.prev.val, 'sixth edited');
//   });
// });
