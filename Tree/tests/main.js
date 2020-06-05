class Node {
  constructor(val) {
    this.val = val;
    this.children = [];
  }
}

class Tree {
  constructor() {
    this.root = null;
    this._currentNode = null;
    this._history = new Stack();
  }

  addChild(val) {
    if (!this.root) {
      this.root = new Node(val);
      this._currentNode = this.root;

      this.addChild = val => {
        if (!this._currentNode) this._currentNode = this.root;

        const newNode = new Node(val);
        this._currentNode.children.push(newNode);
        this._history.push(this._currentNode);
        this._currentNode = newNode;
        return this;
      };

      return this;
    }
  }

  addSybling(val) {
    this.toParent();
    return this.addChild(val);
  }

  toParent() {
    this._currentNode = this._history.pop();
    return this;
  }

  getChild(index) {
    const node = this._currentNode.children[index];

    this._history.push(this._currentNode);
    this._currentNode = node;
    return this;
  }

  getChildByVal(val) {
    const node = this._currentNode.children.find(child => child.val === val);
    this._history.push(this._currentNode);
    this._currentNode = node;
    return this;
  }

  insertChild(val, index) {
    const syblings = this._currentNode.children;

    const newNode = new Node(val);

    this._currentNode.children = [...syblings.slice(0, index), newNode, ...syblings.slice(index)];
    this._currentNode = newNode;
    return this;
  }

  toRoot() {
    this._currentNode = this.root;
    this._history.clear();
    return this;
  }

  getNodeByPath(path) {
    if (!path.length) return this;
    this.getChild(path.shift());
    return this.getNodeByPath(path);
  }

  get() {
    return this._currentNode.val;
  }

  *BFS() {
    let toVisit = new Queue(this.root);

    const traverse = toVisit => {
      const current = toVisit.pop();
      if (!current) return;
      const children = current.children;
      children.length && toVisit.push(...children);
      return current.val;
    };

    while (toVisit.size) {
      yield traverse(toVisit);
    }
  }

  *reversedBFS() {
    let toVisit = new Queue(this.root);
    const data = new Stack();

    const traverse = toVisit => {
      const current = toVisit.pop();
      if (!current) return;
      const children = current.children;
      const len = children.length;
      for (let i = len - 1; i >= 0; i--) {
        toVisit.push(children[i]);
      }
      return current.val;
    };

    while (toVisit.size) {
      data.push(traverse(toVisit));
    }
    while(data.size) {
      yield data.pop();
    }
  }

  *preOrderDFS() {
    function* traverse(node) {
      const children = new Queue(...node.children);
      yield node.val;

      while (children.size) {
        yield* traverse(children.pop());
      }
    }

    yield* traverse(this.root);
  }

  *postOrderDFS() {
    function* traverse(node) {
      const children = new Queue(...node.children);

      while (children.size) {
        yield* traverse(children.pop());
      }

      yield node.val;
    }

    yield* traverse(this.root);
  }

  *inOrderDFS(val) {
    function* traverse(node) {
      const children = new Queue(...node.children);

      if (children.size) {
        yield* traverse(children.pop());
      }

      yield node.val;
      while (children.size) {
        yield* traverse(children.pop());
      }
    }

    yield* traverse(this.root);
  }

  findBFS(val) {
    return this.find(val, 'BFS');
  }

  findReversedBFS(val) {
    return this.find(val, 'reversedBFS');
  }

  findPreOrderDFS(val) {
    return this.find(val, 'preOrderDFS');
  }

  findPostOrderDFS(val) {
    return this.find(val, 'postOrderDFS');
  }

  findInOrderDFS(val) {
    return this.find(val, 'inOrderDFS');
  }

  find(val, method) {
    let current;
    const iterator = this[method]();
    let i = 0;
    do {
      current = iterator.next();
      if (current.value === val) return true;
      if (i++ > 100) break;
    } while (!current.done);
    return false;
  }
}

class StackNode {
  constructor(val, next) {
    this.val = val;
    this.next = next || null;
  }
}

class Stack {
  constructor(...elems) {
    this.clear();
    elems.forEach(elem => this.push(elem));
  }

  push(...args) {
    if (args.length > 1) {
      args.forEach(arg => this.push(arg));
      return this.size;
    }
    const oldfirst = this.first;
    this.first = new StackNode(args[0]);
    this.first.next = oldfirst;
    if (!this.size) this.last = this.first;
    return ++this.size;
  }

  pop() {
    if (!this.size) return undefined;
    const currentfirst = this.first;
    const newfirst = currentfirst.next;
    if (newfirst) {
      this.first = newfirst;
      this.size--;
    } else {
      [this.first, this.last, this.size] = [null, null, 0];
    }
    return currentfirst.val;
  }

  clear() {
    [this.first, this.last, this.size] = [null, null, 0];
  }

  print() {
    var arr = [];
    let current = this.first;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    return arr;
  }
}

class Queue {
  constructor(...elems) {
    this.clear();
    elems.forEach(elem => this.push(elem));
  }

  push(...args) {
    if (args.length > 1) {
      args.forEach(arg => this.push(arg));
      return this.size;
    }
    const newNode = new StackNode(args[0]);
    if (!this.size) {
      this.last = this.first = newNode;
    } else {
      this.last = this.last.next = newNode;
    }
    return ++this.size;
  }

  pop() {
    if (!this.size) return undefined;
    const currentHead = this.first;
    const newHead = currentHead.next;
    if (newHead) {
      this.first = newHead;
      this.size--;
    } else {
      this.clear();
    }
    return currentHead.val;
  }

  clear() {
    [this.first, this.last, this.size] = [null, null, 0];
  }

  print() {
    var arr = [];
    let current = this.first;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    return arr;
  }
}

var assert = chai.assert;

const tree = new Tree();

describe(`tree
  .addChild(5)
    .addChild(10)
      .addChild(7)
        .addChild(9)
      .toParent()
    .toParent()
      .addChild(8)
        .addChild(11)
      .toParent()
    .toParent()
  .toParent()
    .addChild(6)
      .addChild(4)
      .addSybling(2)
    .toParent()
  .toParent()
    .addChild(3)
      .addChild(1)
      .addSybling(0) `, function() {
  before(function() {
    tree
      .addChild(5)
      .addChild(10)
      .addChild(7)
      .addChild(9)
      .toParent()
      .toParent()
      .addChild(8)
      .addChild(11)
      .toParent()
      .toParent()
      .toParent()
      .addChild(6)
      .addChild(4)
      .addSybling(2)
      .toParent()
      .toParent()
      .addChild(3)
      .addChild(1)
      .addSybling(0);
  });

  it('tree.root.val is 5', function() {
    assert.equal(tree.root.val, 5);
  });

  it('tree.root.children.map(child => child.val) is [10,6,3]', function() {
    assert.deepEqual(
      tree.root.children.map(child => child.val),
      [10, 6, 3]
    );
  });

  it('[...tree.BFS()] is [5,10,6,3,7,8,4,2,1,0,9,11]', function() {
    assert.deepEqual([...tree.BFS()], [5, 10, 6, 3, 7, 8, 4, 2, 1, 0, 9, 11]);
  });

  it('[...tree.reversedBFS()] is [9, 11, 7, 8, 4, 2, 1, 0, 10, 6, 3, 5]', function() {
    assert.deepEqual(console.log( [...tree.reversedBFS()]) || [...tree.reversedBFS()], [9, 11, 7, 8, 4, 2, 1, 0, 10, 6, 3, 5]);
  });

  it('[...tree.preOrderDFS()] is [5,10,7,9,8,11,6,4,2,3,1,0]', function() {
    assert.deepEqual([...tree.preOrderDFS()], [5, 10, 7, 9, 8, 11, 6, 4, 2, 3, 1, 0]);
  });

  it('[...tree.postOrderDFS()] is [9,7,11,8,10,4,2,6,1,0,3,5]', function() {
    assert.deepEqual(console.log([...tree.postOrderDFS()]) || [...tree.postOrderDFS()], [
      9,
      7,
      11,
      8,
      10,
      4,
      2,
      6,
      1,
      0,
      3,
      5
    ]);
  });

  it('[...tree.inOrderDFS()] is [9, 7, 10, 11, 8, 5, 4, 6, 2, 1, 3, 0]', function() {
    assert.deepEqual(console.log([...tree.inOrderDFS()]) || [...tree.inOrderDFS()], [
      9,
      7,
      10,
      11,
      8,
      5,
      4,
      6,
      2,
      1,
      3,
      0
    ]);
  });

  it('tree.findPreOrderDFS(10) is true', function() {
    assert.equal(tree.findPreOrderDFS(10), true);
  });

  it('tree.findPreOrderDFS(0) is true', function() {
    assert.equal(tree.findPreOrderDFS(0), true);
  });

  it('tree.findPreOrderDFS(36) is false', function() {
    assert.equal(tree.findPreOrderDFS(36), false);
  });

  it('tree.findBFS(10) is true', function() {
    assert.equal(tree.findBFS(10), true);
  });

  it('tree.findBFS(0) is true', function() {
    assert.equal(tree.findBFS(0), true);
  });

  it('tree.findBFS(36) is false', function() {
    assert.equal(tree.findBFS(36), false);
  });

  it('tree.findReversedBFS(10) is true', function() {
    assert.equal(tree.findReversedBFS(10), true);
  });

  it('tree.findReversedBFS(0) is true', function() {
    assert.equal(tree.findReversedBFS(0), true);
  });

  it('tree.findReversedBFS(36) is false', function() {
    assert.equal(tree.findReversedBFS(36), false);
  });

  it('tree.findPostOrderDFS(10) is true', function() {
    assert.equal(tree.findPostOrderDFS(10), true);
  });

  it('tree.findPostOrderDFS(0) is true', function() {
    assert.equal(tree.findPostOrderDFS(0), true);
  });

  it('tree.findPostOrderDFS(36) is false', function() {
    assert.equal(tree.findPostOrderDFS(36), false);
  });

  it('tree.findInOrderDFS(10) is true', function() {
    assert.equal(tree.findInOrderDFS(10), true);
  });

  it('tree.findInOrderDFS(0) is true', function() {
    assert.equal(tree.findInOrderDFS(0), true);
  });

  it('tree.findInOrderDFS(36) is false', function() {
    assert.equal(tree.findInOrderDFS(36), false);
  });

  it('tree.toRoot().getNodeByPath([0,1,0]).get() is 11', function() {
    assert.equal(
      tree
        .toRoot()
        .getNodeByPath([0, 1, 0])
        .get(),
      11
    );
  });

  it('tree.toRoot().getNodeByPath([2,1]).get() is 0', function() {
    assert.equal(
      tree
        .toRoot()
        .getNodeByPath([2, 1])
        .get(),
      0
    );
  });
});
