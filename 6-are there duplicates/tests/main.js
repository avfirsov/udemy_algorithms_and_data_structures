const getFrequency = str => [].reduce.call(str, (r, c) => Object.assign(r, {[c]: ++r[c] || 1}), {});

const objectsAreEqual = (o1, o2) => Object.keys(o1).length === Object.keys(o2).length
  && Object.keys(o1).every(key => o1[key] === o2[key]);

const sameFrequency = (a, b) => objectsAreEqual(
    getFrequency(a.toString()),
    getFrequency(b.toString())
);

const iterateArray = (arr, fromInd, cb, breakCbBefore, reverse) => {
  const len = arr.length;
  if (!reverse) {
    for (let i = fromInd; i < len; i++) {
      const v = arr[i];
      if (breakCbBefore && breakCbBefore(v, i, arr)) return i;
      cb && cb(v, i, arr);
    }
    console.log("TCL: iterateArray -> len", len)
    return len;
  } else {
    for (let i = fromInd; i >= 0; i--) {
      const v = arr[i];
      if (breakCbBefore && breakCbBefore(v, i, arr)) return i;
      cb && cb(v, i, arr);
    }
    return -1;
  }
};

const areThereDuplicates = (...args) =>
  iterateArray(
    args,
    0,
    null,
    (v1, i) =>
      iterateArray(
        args,
        i + 1,
        null,
        v2 => v1 === v2
      ) !== args.length
  ) !== args.length;


const areThereDuplicatesFrequency = (...args) => !Object.values(getFrequency(args)).every(freq => freq === 1);


var assert = chai.assert;


describe('areThereDuplicates - multiple pointers', function() {
  it('should return false for 1,2,3', function() {
    assert.equal(areThereDuplicates(1,2,3), false);
  });

  it('should return true for 1,2,2', function() {
    assert.equal(areThereDuplicates(1,2,2), true);
  });

  it('should return true for "a", "b", "c", "a"',function() {
    assert.equal(areThereDuplicates("a", "b", "c", "a"), true);
  });
});


describe('areThereDuplicates - frequency counter', function() {
  it('should return false for 1,2,3', function() {
    assert.equal(areThereDuplicatesFrequency(1,2,3), false);
  });

  it('should return true for 1,2,2', function() {
    assert.equal(areThereDuplicatesFrequency(1,2,2), true);
  });

  it('should return true for "a", "b", "c", "a"',function() {
    assert.equal(areThereDuplicatesFrequency("a", "b", "c", "a"), true);
  });
});