const isSubsequence = (needle, haystack) => {
  let lenNeedle = needle.length, lenHaystack = haystack.length, j = 0, i = 0;
  const delta = lenHaystack - lenNeedle;

  while (i < lenNeedle && i >= j - delta) {
    if (needle[i] === haystack[j]) (i++, j++);
    else j++;
  }
  return i === lenNeedle;
}


var assert = chai.assert;


describe('isSubsequence - multiple pointers', function() {
  it('should return true for ("hello", "hello world")', function() {
    assert.equal(isSubsequence("hello", "hello world"), true);
  });

  it('should return true for ("sing", "sting")', function() {
    assert.equal(isSubsequence("sing", "sting"), true);
  });

  it('should return true for ("abc", "abracadabra")', function() {
    assert.equal(isSubsequence("abc", "abracadabra"), true);
  });

  it('should return false for ("abc", "acb")', function() {
    assert.equal(isSubsequence("abc", "acb"), false);
  });

  it('should return false for ("abc", "ab")', function() {
    assert.equal(isSubsequence("abc", "ab"), false);
  });

  it('should return true for ("c", "abc")', function() {
    assert.equal(isSubsequence("", "abc"), true);
  });
});

