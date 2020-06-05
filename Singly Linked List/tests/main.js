class Node {
  constructor(val, next) {
    this.val = val;
    this.next = next || null;
  }
}

class SinglyLinkedList {

  constructor(...elems) {
    this.clear();
    elems.forEach(elem => this.push(elem));
  }


  push(...args) {
    if (args.length > 1) {
      args.forEach(arg => this.push(arg));
      return this;
    }
    const newNode = new Node(args[0]);
    if (!this.length) {
      this.tail = this.head = newNode;
    } else {
      this.tail = this.tail.next = newNode;
    }
    this.length++;
    return this;
  }


  pop() {
    const len = this.length;
    if (!len) return undefined;
    const last = this.tail;
    const beforeLast = this.get(len - 2);
    this.length--;
    if (!this.length) {
      this.clear();
      return last;
    }
    this.tail = beforeLast;
    beforeLast && (beforeLast.next = null);
    return last;
  }


  shift() {
    if (!this.length) return undefined;
    const currentHead = this.head;
    const newHead = currentHead.next;
    if (newHead) {
      this.head = newHead;
    } else {
      this.clear();
    }
    this.length--;
    return currentHead;
  }


  unshift(...args) {
    if (args.length > 1) {
      args.forEach(arg => this.unshift(arg));
      return this;
    }
    const oldHead = this.head;
    this.head = new Node(args[0]);
    this.head.next = oldHead;
    if (!this.length) this.tail = this.head;
    this.length++;
    return this;
  }


  get(i) {
    if (i < 0 || i > this.length - 1) return null;
    if (i === this.length - 1) return this.tail;
    let ith = this.head;
    for (let ci = 0; ci < i; ci++) {
      ith = ith.next;
    }
    return ith;
  }


  set(i, val) {
    const currentNode = this.get(i);
    if (currentNode) {
      currentNode.val = val;
      return true;
    }
    return false;
  }


  insert(i, val) {
    if (i < 0 || i > this.length) return false;
    if (i === 0) {
      this.unshift(val);
    } else if (i === this.length) {
      this.push(val);
    } else {
      const newNode = new Node(val);
      const prev = this.get(i - 1);
      newNode.next = prev.next;
      prev.next = newNode;
      this.length++;
    }
    return true;
  }


  remove(i) {
    if (i < 0 || i > this.length - 1) return undefined;
    if (i === 0) {
      return this.shift();
    } else if (i === this.length - 1) {
      return this.pop();
    } else {
      const beforeRemovable = this.get(i - 1);
      const removable = beforeRemovable.next;
      beforeRemovable.next = removable.next;
      this.length--;
      return removable;
    }
  }


  swap(i, j) {
    if ([i, j].some(ind => ind < 0 || ind > this.length - 1)) return false;
    if (i === j) return true;
    const min = Math.min(i, j);
    const max = Math.max(i, j);
    const delta = max - min;
    const swapThis = this.get(min);
    const savedVal = swapThis.val;
    let swapWithThis = swapThis.next;
    for (let i = 1; i < delta; i++) {
      swapWithThis = swapWithThis.next;
    }
    this.set(min, swapWithThis.val);
    this.set(max, savedVal);
    return true;
  }


  reverse() {
    const len = this.length;
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next;
    let prev = null;
    for (let i = 0; i < len; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }

// reverse() {
//   const len = this.length;
//   const decrementedLen = len - 1;
//   const loopTill = Math.floor(len / 2);
//   for (let i = 0; i < loopTill; i++) {
//     this.swap(i, decrementedLen - i);
//   }
//   return this;
// }



  clear() {
    [this.head, this.tail, this.length] = [null, null, 0];
  }


  print() {
    var arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
  }
}

var assert = chai.assert;

const test = new SinglyLinkedList('first', 'second', 'third', 'forth');

describe("SinglyLinkedList created by new SinglyLinkedList('first', 'second', 'third', 'forth')", function() {
  it('length is 4', function() {
    assert.equal(test.length, 4);
  });

  it('head is "first"', function() {
    assert.equal(test.head.val, 'first');
  });

  it('tail is "forth"', function() {
    assert.equal(test.tail.val, 'forth');
  });

  it('head.next is "second"', function() {
    assert.equal(test.head.next.val, 'second');
  });

  it('head.next.next is "third"', function() {
    assert.equal(test.head.next.next.val, 'third');
  });
});

describe("test.push('fifth')", function() {
  let returned;
  before(function() {
    returned = test.push('fifth');
  });

  it('length is 5', function() {
    assert.equal(test.length, 5);
  });

  it('forth element is "forth"', function() {
    assert.equal(test.head.next.next.next.val, 'forth');
  });

  it('tail is "fifth"', function() {
    assert.equal(test.tail.val, 'fifth');
  });

  it('returned is test itself', function() {
    assert.equal(returned, test);
  });
});

describe("test.push('sixth', 'seventh')", function() {
  let returned;
  before(function() {
    returned = test.push('sixth', 'seventh');
  });

  it('length is 7', function() {
    assert.equal(test.length, 7);
  });

  it('before tail is "sixth"', function() {
    assert.equal(test.head.next.next.next.next.next.val, 'sixth');
  });

  it('tail is "seventh"', function() {
    assert.equal(test.tail.val, 'seventh');
  });

  it('returned is test itself', function() {
    assert.equal(returned, test);
  });
});

describe('test.pop()', function() {
  let returned;
  before(function() {
    returned = test.pop();
  });

  it('length is 6', function() {
    assert.equal(test.length, 6);
  });

  it('forth element is "forth"', function() {
    assert.equal(test.head.next.next.next.val, 'forth');
  });

  it('tail is "sixth"', function() {
    assert.equal(test.tail.val, 'sixth');
  });

  it('returned "seventh"', function() {
    assert.equal(returned.val, 'seventh');
  });
});

describe('test.shift()', function() {
  let returned;
  before(function() {
    returned = test.shift();
  });

  it('length is 5', function() {
    assert.equal(test.length, 5);
  });

  it('head is "second"', function() {
    assert.equal(test.head.val, 'second');
  });

  it('forth element is "fifth"', function() {
    assert.equal(test.head.next.next.next.val, 'fifth');
  });

  it('tail is "sixth"', function() {
    assert.equal(test.tail.val, 'sixth');
  });

  it('returned "first"', function() {
    assert.equal(returned.val, 'first');
  });
});

describe("test.shift(); test.unshift('second', 'first')", function() {
  let returned;
  before(function() {
    test.shift();
    returned = test.unshift('second', 'first');
  });

  it('length is 6', function() {
    assert.equal(test.length, 6);
  });

  it('forth element is "forth"', function() {
    assert.equal(test.head.next.next.next.val, 'forth');
  });

  it('tail is "sixth"', function() {
    assert.equal(test.tail.val, 'sixth');
  });

  it('returned test itself', function() {
    assert.equal(returned, test);
  });
});

describe('test.get(i)', function() {
  it('test.get(0) is "first"', function() {
    assert.equal(test.get(0).val, 'first');
  });

  it('test.get(-1) is null', function() {
    assert.equal(test.get(-1), null);
  });

  it('test.get(100) is null', function() {
    assert.equal(test.get(100), null);
  });

  it('test.get(2) is "third"', function() {
    assert.equal(test.get(2).val, 'third');
  });

  it('test.get(5) is "sixth"', function() {
    assert.equal(test.get(5).val, 'sixth');
  });
});

describe("test.set(i, test.get(i) + ' edited')", function() {
  before(function() {
    [0, 1, 2, 3, 4, 5].forEach(i => test.set(i, test.get(i).val + ' edited'));
  });

  it('test.get(0) is "first edited"', function() {
    assert.equal(test.get(0).val, 'first edited');
  });

  it('test.get(-1) is null', function() {
    assert.equal(test.get(-1), null);
  });

  it('test.get(100) is null', function() {
    assert.equal(test.get(100), null);
  });

  it('test.get(2) is "third edited"', function() {
    assert.equal(test.get(2).val, 'third edited');
  });

  it('test.get(5) is "sixth edited"', function() {
    assert.equal(test.get(5).val, 'sixth edited');
  });
});

describe("test.insert(i, 'after ' + test.get(i))", function() {
  before(function() {
    [1, 3, 5, 7, 9, 11].forEach(i => test.insert(i, 'after ' + test.get(i - 1).val));
  });

  it('length is 12', function() {
    assert.equal(test.length, 12);
  });

  it('test.head is "first edited"', function() {
    assert.equal(test.head.val, 'first edited');
  });

  it('test.get(1) is "after first edited"', function() {
    assert.equal(test.get(1).val, 'after first edited');
  });

  it('test.get(-1) is null', function() {
    assert.equal(test.get(-1), null);
  });

  it('test.get(100) is null', function() {
    assert.equal(test.get(100), null);
  });

  it('test.get(3) is "after second edited"', function() {
    assert.equal(test.get(3).val, 'after second edited');
  });

  it('test.tail is "after sixth edited"', function() {
    assert.equal(test.tail.val, 'after sixth edited');
  });
});

describe('[11,9,7,5,3,1].forEach(i => test.remove(i))', function() {
  before(function() {
    [11, 9, 7, 5, 3, 1].forEach(i => test.remove(i));
  });

  it('length is 6', function() {
    assert.equal(test.length, 6);
  });

  it('test.head is "first edited"', function() {
    assert.equal(test.head.val, 'first edited');
  });

  it('test.get(1) is "second edited"', function() {
    assert.equal(test.get(1).val, 'second edited');
  });

  it('test.get(-1) is null', function() {
    assert.equal(test.get(-1), null);
  });

  it('test.get(100) is null', function() {
    assert.equal(test.get(100), null);
  });

  it('test.get(3) is "forth edited"', function() {
    assert.equal(test.get(3).val, 'forth edited');
  });

  it('test.tail is "sixth edited"', function() {
    assert.equal(test.tail.val, 'sixth edited');
  });
});

describe('test.reverse()', function() {
  before(function() {
    test.reverse();
  });

  it('length is 6', function() {
    assert.equal(test.length, 6);
  });

  it('test.head is "sixth edited"', function() {
    assert.equal(test.head.val, 'sixth edited');
  });

  it('test.get(1) is "fifth edited"', function() {
    assert.equal(test.get(1).val, 'fifth edited');
  });

  it('test.get(-1) is null', function() {
    assert.equal(test.get(-1), null);
  });

  it('test.get(100) is null', function() {
    assert.equal(test.get(100), null);
  });

  it('test.get(3) is "third edited"', function() {
    assert.equal(test.get(3).val, 'third edited');
  });

  it('test.tail is "first edited"', function() {
    assert.equal(test.tail.val, 'first edited');
  });
});
