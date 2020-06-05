class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const lookup = this.$get(val);
    if (!lookup) {
      this.root = new Node(val);
    } else if (!lookup.found) {
      lookup.prev[lookup.direction] = new Node(val);
    }
    return this;
  }

  find(val) {
    return !!this.$get(val).found;
  }

  //returns either false if root is null, either object with node with serching val
  $get(val) {
    if (!this.root) return false;

    let currentNode;
    let nextNode = this.root;
    let direction;

    do {
      if (nextNode.val === val) break;
      currentNode = nextNode;
      direction = currentNode.val > val ? 'left' : 'right';
      nextNode = currentNode[direction];
    } while (nextNode);

    return {
      found: nextNode,
      prev: currentNode,
      direction
    };
  }
}

var assert = chai.assert;

const bst = new BinarySearchTree();

describe('bst.insert(5).insert(3).insert(10).insert(6)', function() {
  before(function() {
    bst
      .insert(5)
      .insert(3)
      .insert(10)
      .insert(6);
  });

  it('bst.root is 5', function() {
    assert.equal(bst.root.val, 5);
  });

  it('bst.root.left is 3', function() {
    assert.equal(bst.root.left.val, 3);
  });

  it('bst.root.right is 10', function() {
    assert.equal(bst.root.right.val, 10);
  });

  it('bst.root.right.left is 6', function() {
    assert.equal(bst.root.right.left.val, 6);
  });
});

describe('bst find', function() {
  it('bst.find(5) is true', function() {
    assert.equal(bst.find(5), true);
  });

  it('bst.find(10) is true', function() {
    assert.equal(bst.find(10), true);
  });

  it('bst.find(199) is false', function() {
    assert.equal(bst.find(199), false);
  });

  it('bst.find(6) is true', function() {
    assert.equal(bst.find(6), true);
  });

  it('bst.find(14) is false', function() {
    assert.equal(bst.find(14), false);
  });
});










const $getHelper = (prevNode, direction, val) =>
  prevNode[direction] ?
    $getHelper(
      prevNode[direction],
      $getDirection(prevNode[direction], val),
      val
    )
      :
    {
      direction,
      found: prevNode[direction],
      prev: prevNode
    }

const $getDirection = (node, val) =>
  node.val === val ? null
    : node.val > val ? 'left' : 'right';



class BinarySearchTreeRecuresive {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const lookup = this.$get(val);
    if (!lookup) {
      this.root = new Node(val);
    } else if (!lookup.found) {
      lookup.prev[lookup.direction] = new Node(val);
    }
    return this;
  }

  find(val) {
    return !!this.$get(val).found;
  }

  //returns either false if root is null, either object with node with serching val
  $get(val) {
    return this.root ?
      this.root.val === val ? { found: this.root, direction: null, prev: null } : $getHelper(this.root, $getDirection(this.root, val), val)
      : false;
  }
}


const bstRec = new BinarySearchTree();

describe('bstRec.insert(5).insert(3).insert(10).insert(6)', function() {
  before(function() {
    bstRec
      .insert(5)
      .insert(3)
      .insert(10)
      .insert(6);
  });

  it('bstRec.root is 5', function() {
    assert.equal(bstRec.root.val, 5);
  });

  it('bstRec.root.left is 3', function() {
    assert.equal(bstRec.root.left.val, 3);
  });

  it('bstRec.root.right is 10', function() {
    assert.equal(bstRec.root.right.val, 10);
  });

  it('bstRec.root.right.left is 6', function() {
    assert.equal(bstRec.root.right.left.val, 6);
  });
});

describe('bstRec find', function() {
  it('bstRec.find(5) is true', function() {
    assert.equal(bstRec.find(5), true);
  });

  it('bstRec.find(10) is true', function() {
    assert.equal(bstRec.find(10), true);
  });

  it('bstRec.find(199) is false', function() {
    assert.equal(bstRec.find(199), false);
  });

  it('bstRec.find(6) is true', function() {
    assert.equal(bstRec.find(6), true);
  });

  it('bstRec.find(14) is false', function() {
    assert.equal(bstRec.find(14), false);
  });
});