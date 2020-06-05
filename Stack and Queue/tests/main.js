class Node {
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
    this.first = new Node(args[0]);
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
  }
}

var assert = chai.assert;

const stack = new Stack('first', 'second', 'third', 'forth');

describe("Stack created by new Stack('first', 'second', 'third', 'forth')", function() {
  it('size is 4', function() {
    assert.equal(stack.size, 4);
  });

  it('first is "forth"', function() {
    assert.equal(stack.first.val, 'forth');
  });

  it('last is "first"', function() {
    assert.equal(stack.last.val, 'first');
  });

  it('first.next is "third"', function() {
    assert.equal(stack.first.next.val, 'third');
  });

  it('first.next.next is "second"', function() {
    assert.equal(stack.first.next.next.val, 'second');
  });
});

describe("stack.push('fifth')", function() {
  let returned;
  before(function() {
    returned = stack.push('fifth');
  });

  it('size is 5', function() {
    assert.equal(stack.size, 5);
  });

  it('first is "fifth"', function() {
    assert.equal(stack.first.val, 'fifth');
  });

  it('returned is 5', function() {
    assert.equal(returned, 5);
  });
});

describe("stack.push('sixth', 'seventh')", function() {
  let returned;
  before(function() {
    returned = stack.push('sixth', 'seventh');
  });

  it('size is 7', function() {
    assert.equal(stack.size, 7);
  });

  it('after first is "sixth"', function() {
    assert.equal(stack.first.next.val, 'sixth');
  });

  it('first is "seventh"', function() {
    assert.equal(stack.first.val, 'seventh');
  });

  it('returned is 7', function() {
    assert.equal(returned, 7);
  });
});

describe('stack.pop()', function() {
  let returned;
  before(function() {
    returned = stack.pop();
  });

  it('size is 6', function() {
    assert.equal(stack.size, 6);
  });

  it('forth element is "third"', function() {
    assert.equal(stack.first.next.next.next.val, 'third');
  });

  it('first is "sixth"', function() {
    assert.equal(stack.first.val, 'sixth');
  });

  it('returned "seventh"', function() {
    assert.equal(returned, 'seventh');
  });
});

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
    const newNode = new Node(args[0]);
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
  }
}

const queue = new Queue('first', 'second', 'third', 'forth');

describe("Queue created by new Queue('first', 'second', 'third', 'forth')", function() {
  it('size is 4', function() {
    assert.equal(queue.size, 4);
  });

  it('first is "first"', function() {
    assert.equal(queue.first.val, 'first');
  });

  it('last is "forth"', function() {
    assert.equal(queue.last.val, 'forth');
  });

  it('first.next is "second"', function() {
    assert.equal(queue.first.next.val, 'second');
  });

  it('first.next.next is "third"', function() {
    assert.equal(queue.first.next.next.val, 'third');
  });
});

describe("queue.push('fifth')", function() {
  let returned;
  before(function() {
    returned = queue.push('fifth');
  });

  it('size is 5', function() {
    assert.equal(queue.size, 5);
  });

  it('first is "first"', function() {
    assert.equal(queue.first.val, 'first');
  });

  it('last is "fifth"', function() {
    assert.equal(queue.last.val, 'fifth');
  });

  it('returned is 5', function() {
    assert.equal(returned, 5);
  });
});

describe("queue.push('sixth', 'seventh')", function() {
  let returned;
  before(function() {
    returned = queue.push('sixth', 'seventh');
  });

  it('size is 7', function() {
    assert.equal(queue.size, 7);
  });

  it('after first is "second"', function() {
    assert.equal(queue.first.next.val, 'second');
  });

  it('first is "first"', function() {
    assert.equal(queue.first.val, 'first');
  });

  it('last is "seventh"', function() {
    assert.equal(queue.last.val, 'seventh');
  });

  it('returned is 7', function() {
    assert.equal(returned, 7);
  });
});

describe('queue.pop()', function() {
  let returned;
  before(function() {
    returned = queue.pop();
  });

  it('size is 6', function() {
    assert.equal(queue.size, 6);
  });

  it('forth element is "fifth"', function() {
    assert.equal(queue.first.next.next.next.val, 'fifth');
  });

  it('first is "second"', function() {
    assert.equal(queue.first.val, 'second');
  });

  it('returned "first"', function() {
    assert.equal(returned, 'first');
  });
});
