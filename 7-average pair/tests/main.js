const averagePair = (arr, average) => {
  const len = arr.length;
  const doubled = average * 2;

  let left = 0, right = len - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum < doubled) left++;
    else if (sum > doubled) right--;
    else return true;
  };
  return false;
};


var assert = chai.assert;


describe('averagePair - multiple pointers', function() {
  it('should return true for ([1,2,3], 2.5)', function() {
    assert.equal(averagePair([1,2,3], 2.5), true);
  });

  it('should return true for ([1,3,3,5,6,7,10,12,19], 8)', function() {
    assert.equal(averagePair([1,3,3,5,6,7,10,12,19], 8), true);
  });

  it('should return false for ([-1,0,3,4,5,6], 4.1)', function() {
    assert.equal(averagePair([-1,0,3,4,5,6], 4.1), false);
  });

  it('should return false for ([], 4)', function() {
    assert.equal(averagePair([], 4), false);
  });
});

