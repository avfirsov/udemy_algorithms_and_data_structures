const minSubArrayLen = (arr, int) => {
  let result = Infinity, left = 0, right = 0, tmp = arr[0];
  const len = arr.length;
  while ( right < len - 1 || tmp >= int) {
    if (tmp >= int) {
      const subLen = right - left + 1;
      if (subLen < result) result = subLen;
      tmp = tmp - arr[left++]
    } else tmp = tmp + arr[++right];
  }

  return result < Infinity ? result : 0;
}


var assert = chai.assert;


describe('isSubsequence - multiple pointers', function() {
  it('should return 2 for ([2,3,1,2,4,3], 7)', function() {
    assert.equal(minSubArrayLen([2,3,1,2,4,3], 7),2);
  });

  it('should return 2 for ([2,1,6,5,4], 9)', function() {
    assert.equal(minSubArrayLen([2,1,6,5,4], 9),2);
  });

  it('minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52) should return 1', function() {
    assert.equal(minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52),1);
  });

  it('minSubArrayLen([1,4,16,22,5,7,8,9,10],39) should return 3', function() {
    assert.equal(minSubArrayLen([1,4,16,22,5,7,8,9,10],39),3);
  });

  it('minSubArrayLen([1,4,16,22,5,7,8,9,10],55) should return 5', function() {
    assert.equal(minSubArrayLen([1,4,16,22,5,7,8,9,10],55),5);
  });

  it('minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11) should return 2', function() {
    assert.equal(minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11),2);
  });

  it('minSubArrayLen([1,4,16,22,5,7,8,9,10],95) should return 0', function() {
    assert.equal(minSubArrayLen([1,4,16,22,5,7,8,9,10],95),0);
  });
});

