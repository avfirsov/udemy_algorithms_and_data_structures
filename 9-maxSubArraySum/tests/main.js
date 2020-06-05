const maxSubArraySum = (arr, len) => {
  const max = -Infinity;
  const length = arr.length;

  if (len > length) return null;

  let sum = 0;
  //находим первую сумму
  for (let i = 0; i < len; i++) {
    sum += arr[i];
  }

  let tmp = sum;

  for (let i = 0; i < length; i++) {
    tmp = tmp - arr[i] + arr[i + len];
    if (tmp > sum) sum = tmp;
  }
  return sum;
};

var assert = chai.assert;

describe('maxSubArraySum - sliding window', function() {
  it('should return 5 for ([1,2,3], 2)', function() {
    assert.equal(maxSubArraySum([1, 2, 3], 2), 5);
  });

  it('should return 700 for ([100,200,300,400], 2)', function() {
    assert.equal(maxSubArraySum([100, 200, 300, 400], 2), 700);
  });

  it('should return null for ([2,3], 3)', function() {
    assert.equal(maxSubArraySum([2, 3], 3), null);
  });

  it('should return 39 for ([1,4,2,10,23,3,1,0,20], 4)', function() {
    assert.equal(maxSubArraySum([1,4,2,10,23,3,1,0,20], 4), 39);
  });

  it('should return 5 for ([-3,4,0,-2,6,-1], 2)', function() {
    assert.equal(maxSubArraySum([-3,4,0,-2,6,-1], 2), 5);
  });

  it('should return 5 for ([3,-2,7,-4,1,-1,4,-2,1], 2)', function() {
    assert.equal(maxSubArraySum([3,-2,7,-4,1,-1,4,-2,1], 2), 5);
  });
});

