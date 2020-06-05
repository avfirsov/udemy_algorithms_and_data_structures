const fib_recursive = (n) => (n <= 2 ? 1 : fib_recursive(n - 1) + fib_recursive(n - 2));

const fib = (n) => {
  const memory = {};
  const saveToMemoryAndReturn = (key, val) => (memory[key] = val);

  const helper = (n) =>
    n <= 2
      ? 1
      : (memory[n - 1] || saveToMemoryAndReturn(n - 1, helper(n - 1))) +
        (memory[n - 2] || saveToMemoryAndReturn(n - 2, helper(n - 2)));
  return helper(n);
};

const fib2 = (n, memo = [0, 1, 1]) =>
  typeof memo[n] != 'undefined' ? memo[n] : (memo[n] = fib2(n - 1, memo) + fib2(n - 2, memo));

const fib_tabulation = (n) => {
  const memo = [0, 1, 1];
  let i = 3;
  for (; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
};

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
